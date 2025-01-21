import { SanityDocument } from "@sanity/client";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import client from "../data/sanity";
import { SanityQueryParams } from "../types/components";

export const useSingleton = (id: string) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [singleton, setSingleton] = useState<SanityDocument | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async (tries = 0) => {
      try {
        const result = await client.getDocument(id);
        setSingleton(result);
      } catch {
        if (tries < 3) {
          return await fetch(tries + 1);
        } else {
          return navigate("/404");
        }
      }
    };

    if (_.isUndefined(singleton)) {
      fetch();
    }
  }, [singleton, pathname, id]);

  return { singleton };
};

export const useQuery = (query: string, params: SanityQueryParams) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [documents, setDocuments] = useState<SanityDocument[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async (tries = 0) => {
      try {
        const result = await client.fetch(query, params);
        setDocuments(result);
      } catch {
        if (tries < 3) {
          return await fetch(tries + 1);
        } else {
          return navigate("/404");
        }
      }
    };

    if (_.isUndefined(documents)) {
      fetch();
    }
  }, [pathname, documents, query, params]);

  return { documents };
};
