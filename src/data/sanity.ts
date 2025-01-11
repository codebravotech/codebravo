import { createClient } from "@sanity/client";
export default createClient({
  projectId: "fwh29uor",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-10",
});
