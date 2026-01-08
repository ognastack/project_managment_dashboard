import { OgnaClient } from "@ogna/js";

// Initialize the Ogna client with the API base URL
// In production, this should be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost";

export const ognaClient = new OgnaClient(API_BASE_URL);

export default ognaClient;
