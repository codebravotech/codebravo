import { SanityDocument } from "@sanity/client";
import _ from "lodash";
import { useEffect, useState } from "react";

import client from "../data/sanity";

export const useHomepage = () => {
  const [homePage, setHomePage] = useState<SanityDocument | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchHomePage = async () => {
      const result = await client.getDocument("home_page");
      setHomePage(result);
    };

    if (_.isUndefined(homePage)) {
      fetchHomePage();
    }
  }, [homePage]);

  return { homePage };
};
