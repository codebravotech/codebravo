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
        searchParams.delete("token");
        setSearchParams(searchParams);
        localStorage.setItem(localStorageKey, token);
      } catch (e) {
        console.error("AUTHORIZATION SERVER ERROR", e);
        localStorage.removeItem(localStorageKey);
      }
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

  useEffect(() => {
    const fetch = async (tries = 0) => {
      try {
        if (query_name) {
          const result = await publicQuery<T>(query_name);
          if (isArray(result) && result.length > 0) {
            setDocuments(result);
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

  return { documents };
};

export const useAuthorizedQuery = <T>(query_name: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [documents, setDocuments] = useState<T[] | undefined>(undefined);
  const { token: currentToken } = useSystemStore();

  useEffect(() => {
    const fetch = async (token: string, tries = 0) => {
      try {
        const result = await authorizedQuery<T>(query_name, token);
        if (isArray(result) && result.length > 0) {
          setDocuments(result);
        }
      } catch (e) {
        console.log("E: ", e);
        console.error("ERROR IN AUTHORIZED QUERY", e);
        if (tries < 3) {
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

  return { documents };
};
