// Centralized API base URL configuration with safe defaults and normalization
const rawBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return "";
  // Remove any trailing slash to avoid double slashes in requests
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export const API_BASE_URL = normalizeBaseUrl(rawBaseUrl);


