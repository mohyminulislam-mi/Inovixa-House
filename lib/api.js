/**
 * lib/api.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized fetch helper for all backend API calls.
 *
 * Rules enforced here (per project HARD RULES):
 *  - Never use axios or any third-party HTTP library.
 *  - Always send credentials: 'include' for cookie-based JWT auth.
 *  - Always require an explicit cache strategy — never leave it implicit.
 *  - Throw a typed ApiError (with HTTP status) on any non-2xx response so
 *    callers and Next.js error.js boundaries can distinguish error types.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error(
    '[api.js] NEXT_PUBLIC_API_URL is not defined. ' +
    'Add it to .env.local: NEXT_PUBLIC_API_URL=http://localhost:5000/api'
  );
}

// ─── Typed API Error ──────────────────────────────────────────────────────────

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status  HTTP status code
   */
  constructor(message, status) {
    super(message);
    this.name   = 'ApiError';
    this.status = status;
  }
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

/**
 * apiFetch — wraps native fetch() with:
 *   - Base URL prepending
 *   - JSON Content-Type header
 *   - credentials: 'include' (cookies)
 *   - Explicit cache control (required by caller)
 *   - Typed error on non-2xx
 *
 * @param {string} endpoint           Path relative to BASE_URL, e.g. '/properties'
 * @param {RequestInit & {
 *   cache?: RequestCache,
 *   next?: import('next/dist/server/app-render/types').NextFetchRequestConfig,
 * }} [options]
 * @returns {Promise<any>}            Parsed JSON response body
 */
export async function apiFetch(endpoint, options = {}) {
  const { headers: extraHeaders, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  });

  // Parse body regardless — error responses also carry a JSON message
  let data;
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    // Backend sends { message: '...' } on errors
    const message =
      (typeof data === 'object' && data?.message) ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data;
}

// ─── Convenience method builders ──────────────────────────────────────────────

/**
 * Build a query string from a plain object, skipping undefined/null/empty values.
 *
 * @param {Record<string, string | number | boolean | undefined | null>} params
 * @returns {string}  '?key=value&...' or '' if no params
 */
export function buildQuery(params = {}) {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `?${qs}` : '';
}
