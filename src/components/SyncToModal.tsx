import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useSystemStore } from "../state/system";

export default function SyncToModal() {
  const { openProjectId } = useSystemStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (openProjectId) {
      // Put the project ID into the search params
      searchParams.set("p", openProjectId);
      setSearchParams(searchParams);
    } else {
      // Remove it if there's no selected project
      // searchParams.delete("p");
      setSearchParams(searchParams);
    }
  }, [openProjectId, searchParams, setSearchParams]);

  return null;
}
