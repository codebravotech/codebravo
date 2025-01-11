import _ from "lodash";
// import groq from "groq";
import client from "../data/sanity";
import { useEffect, useState } from "react";
import { SanityDocument } from "@sanity/client";

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
