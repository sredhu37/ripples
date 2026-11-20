/** Response shapes of the API. The app keeps its own copy of any shape it reads. */
export interface HealthResponse {
  status: "ok" | "error";
}
