import { SanityDocument } from "@sanity/client";
import _ from "lodash";
import { useEffect, useState } from "react";

import client from "../data/sanity";
import { SanityQueryParams } from "../types/components";

export const useSingleton = (id: string) => {
  const [singleton, setSingleton] = useState<SanityDocument | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await client.getDocument(id);
      setSingleton(result);
    };

    if (_.isUndefined(singleton)) {
      fetch();
    }
  }, [singleton]);

  return { singleton };
};

export const useQuery = (query: string, params: SanityQueryParams) => {
  const [documents, setDocuments] = useState<SanityDocument[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await client.fetch(query, params);
      setDocuments(result);
    };

    if (_.isUndefined(documents)) {
      fetch();
    }
  }, [documents, query, params]);

  return { documents };
};
