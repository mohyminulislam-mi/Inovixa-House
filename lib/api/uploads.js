/**
 * lib/api/uploads.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Image upload API helper for sending FormData to Express backend.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { ApiError } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Upload multiple property images to Cloudinary via Express backend.
 *
 * @param {FormData} formData - FormData containing 'images' files
 * @param {RequestInit & { headers?: Record<string, string> }} [options]
 * @returns {Promise<{ success: boolean, count: number, urls: string[] }>}
 */
export async function uploadPropertyImages(formData, options = {}) {
  const { headers: extraHeaders, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}/uploads/property-images`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    cache: 'no-store',
    ...restOptions,
    headers: {
      ...extraHeaders,
      // Content-Type is intentionally omitted so browser/Node automatically
      // sets the correct multipart/form-data boundary header.
    },
  });

  let data;
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      (typeof data === 'object' && data?.message) ||
      `Upload failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data;
}
