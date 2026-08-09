/**
 * lib/api/rentalRequests.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Rental request management API calls. Built exclusively on apiFetch (native fetch).
 *
 * Cache strategy:
 *  - Admin rental requests list: cache: 'no-store' (must reflect recent status changes)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch, buildQuery } from '@/lib/api';

// ─── JSDoc Types ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} RentalRequest
 * @property {string} _id
 * @property {string} propertyId
 * @property {string} applicantName
 * @property {string} applicantEmail
 * @property {string} applicantPhone
 * @property {string} message
 * @property {'pending'|'approved'|'rejected'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * Fetch list of rental requests. Admin only.
 *
 * @param {Object} [params]
 * @param {string} [params.status]
 * @param {number} [params.page]
 * @returns {Promise<RentalRequest[] | { requests: RentalRequest[], total: number }>}
 */
export async function getRentalRequests(params = {}, options = {}) {
  const qs = buildQuery(params);
  return apiFetch(`/rental-requests${qs}`, {
    ...options,
    cache: 'no-store',
  });
}

/**
 * Update status of a rental request (approved, rejected, pending). Admin only.
 *
 * @param {string} id
 * @param {'pending'|'approved'|'rejected'} status
 * @returns {Promise<RentalRequest>}
 */
export async function updateRequestStatus(id, status) {
  return apiFetch(`/rental-requests/${id}/status`, {
    method: 'PATCH',
    body:   JSON.stringify({ status }),
    cache:  'no-store',
  });
}
