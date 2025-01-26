import { JsonObject } from "../types/components";

const call = async <T>(
  url: string,
  token: string | null,
  data?: JsonObject | undefined,
) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", token);
  }

  const options = {
    method: "POST",
    headers: requestHeaders,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);

  return (await response.json()) as T;
};

export const checkToken = async (token: string) => {
  const VITE_SELF_API_HOST = import.meta.env.VITE_SELF_API_HOST;

  const url = `${VITE_SELF_API_HOST}/authorized`;
  return await call(url, token);
};

export const publicQuery = async <T>(query_name: string) => {
  const VITE_SELF_API_HOST = import.meta.env.VITE_SELF_API_HOST;

  const url = `${VITE_SELF_API_HOST}/query_public`;

  return await call<T>(url, null, { query_name });
};

export const authorizedQuery = async <T>(query_name: string, token: string) => {
  const VITE_SELF_API_HOST = import.meta.env.VITE_SELF_API_HOST;

  const url = `${VITE_SELF_API_HOST}/query_authorized`;

  return await call<T>(url, token, { query_name });
};
