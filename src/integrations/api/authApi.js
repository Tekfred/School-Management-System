import { request } from "../http/httpClient.js";
export const login = (credentials) =>
  request("/auth/login", { method: "POST", body: credentials });
