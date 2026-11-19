/** Shapes shared by the API (`server/`) and the app. Import with `import type` only. */
export interface HealthResponse {
  status: "ok" | "error";
}
