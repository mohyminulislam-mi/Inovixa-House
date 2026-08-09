/**
 * lib/api/communities.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All community-related API calls. Built exclusively on apiFetch (native fetch).
 *
 * Cache strategy:
 *  - Public list/detail: revalidate: 30  → tag 'communities' for instant bust
 *  - Admin mutations:    cache: 'no-store'
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch, buildQuery } from '@/lib/api';

// ─── JSDoc Types ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} NearbyService
 * @property {string} serviceType
 * @property {string} name
 * @property {string} distance
 */

/**
 * @typedef {Object} Community
 * @property {string}          _id
 * @property {string}          name
 * @property {string}          slug
 * @property {string}          overview
 * @property {string[]}        facilities
 * @property {string[]}        gallery
 * @property {{ city: string, coordinates?: { lat: number, lng: number } }} location
 * @property {NearbyService[]} [nearbyServices]
 * @property {{ metaTitle: string, metaDescription: string, keywords: string[] }} [seo]
 * @property {string}          createdAt
 * @property {string}          updatedAt
 */

/**
 * @typedef {Object} CommunitiesResponse
 * @property {Community[]} communities
 * @property {number}      page
 * @property {number}      pages
 * @property {number}      total
 */

/**
 * @typedef {Object} GetCommunitiesParams
 * @property {string} [keyword]
 * @property {string} [city]
 * @property {number} [pageNumber]
 * @property {number} [pageSize]
 */

// ─── Public reads ─────────────────────────────────────────────────────────────

/**
 * Fetch paginated, filterable list of communities.
 *
 * @param {GetCommunitiesParams} [params]
 * @returns {Promise<CommunitiesResponse>}
 */
export async function getCommunities(params = {}) {
  const qs = buildQuery(params);
  return apiFetch(`/communities${qs}`, {
    next: { revalidate: 30, tags: ['communities'] },
  });
}

/**
 * Fetch a single community by slug.
 *
 * @param {string} slug
 * @returns {Promise<Community>}
 */
export async function getCommunityBySlug(slug) {
  return apiFetch(`/communities/${slug}`, {
    next: { revalidate: 300, tags: ['communities', `community-${slug}`] },
  });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

/**
 * Create a new community. Requires admin session cookie.
 *
 * @param {Omit<Community, '_id'|'createdAt'|'updatedAt'>} body
 * @returns {Promise<Community>}
 */
export async function createCommunity(body) {
  return apiFetch('/communities', {
    method: 'POST',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Update an existing community by ID. Requires admin session cookie.
 *
 * @param {string}              id
 * @param {Partial<Community>}  body
 * @returns {Promise<Community>}
 */
export async function updateCommunity(id, body) {
  return apiFetch(`/communities/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Delete a community by ID. Requires admin session cookie.
 *
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export async function deleteCommunity(id) {
  return apiFetch(`/communities/${id}`, {
    method: 'DELETE',
    cache:  'no-store',
  });
}
