import { createClient } from "@sanity/client";

export default createClient({
  projectId: "fwh29uor",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-10",
});
