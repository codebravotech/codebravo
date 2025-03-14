import _, { isArray } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useSystemStore } from "../state/system";
import { authorizedQuery, checkToken, publicQuery } from "../utils/api";

export const useToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setToken } = useSystemStore();
  const localStorageKey = "codebravo_auth_token";
  const storageToken = localStorage.getItem(localStorageKey);
  const paramsToken = searchParams.get("token");
  const currentToken = storageToken || paramsToken;

  useEffect(() => {
    const updateToken = async (token: string) => {
      try {
        await checkToken(token);
        setToken(token);
        localStorage.setItem(localStorageKey, token);
      } catch {
        localStorage.removeItem(localStorageKey);
        alert(
          "Your locked projects session has expired, please visit Connect page and request a new secure link if you'd like to view locked projects.",
        );
      }
      searchParams.delete("token");
      setSearchParams(searchParams);
    };

    if (currentToken) {
      updateToken(currentToken);
    }
  }, []);
};

export const usePublicQuery = <T>(query_name: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [documents, setDocuments] = useState<T[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async (tries = 0) => {
      try {
        if (query_name) {
          const result = await publicQuery<T>(query_name);

          if (isArray(result) && result.length > 0) {
            setDocuments(result);
            setLoading(false);
          }
        }
      } catch (e) {
        console.error("ERROR IN PUBLIC QUERY", e);
        if (tries < 3) {
          return await fetch(tries + 1);
        } else {
          return navigate("/404");
        }
      }
    };

    if (_.isUndefined(documents) && query_name) {
      fetch(0);
    }
  }, [pathname, documents, query_name, navigate]);

  return { documents, loading };
};

export const useAuthorizedQuery = <T>(query_name: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [documents, setDocuments] = useState<T[] | undefined>(undefined);
  const { token: currentToken } = useSystemStore();
  const [loading, setLoading] = useState(!!currentToken);

  useEffect(() => {
    const fetch = async (token: string, tries = 0) => {
      try {
        const result = await authorizedQuery<T>(query_name, token);
        if (isArray(result) && result.length > 0) {
          setDocuments(result);
          setLoading(false);
        }
      } catch (e) {
        if (e instanceof Error && e?.message?.includes("401")) {
          console.log("Unauthorized");
          return;
        } else if (tries < 3) {
          return await fetch(token, tries + 1);
        } else {
          return navigate("/404");
        }
      }
    };

    if (_.isUndefined(documents) && currentToken && query_name) {
      fetch(currentToken, 0);
    }
  }, [pathname, documents, query_name, currentToken, navigate]);

  return { documents, loading };
};
