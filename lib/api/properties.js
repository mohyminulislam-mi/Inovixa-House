/**
 * lib/api/properties.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All property-related API calls. Built exclusively on apiFetch (native fetch).
 *
 * Cache strategy rationale:
 *  - List / detail pages: revalidate: 30  → fresh enough for public visitors,
 *    avoids hammering the DB on every request.
 *  - After admin create/update/delete: caller must use revalidateTag('properties')
 *    in the Server Action to bust the cache instantly.
 *  - Admin CRUD mutations: cache: 'no-store' → always live, no stale data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch, buildQuery } from '@/lib/api';

// ─── JSDoc Types ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} PropertyLocation
 * @property {string} address
 * @property {string} city
 * @property {string} country
 * @property {{ lat: number, lng: number }} [coordinates]
 */

/**
 * @typedef {Object} Property
 * @property {string}           _id
 * @property {string}           title
 * @property {string}           slug
 * @property {string}           description
 * @property {'Apartment'|'Villa'|'Commercial'|'Land'|'Townhouse'} propertyType
 * @property {'For Sale'|'For Rent'|'Off-Plan'} status
 * @property {number}           price
 * @property {number}           area
 * @property {number}           bedrooms
 * @property {number}           bathrooms
 * @property {PropertyLocation} location
 * @property {string[]}         features
 * @property {string[]}         images
 * @property {string}           [featuredImage]
 * @property {string}           [videoTourUrl]
 * @property {string}           [floorPlanUrl]
 * @property {boolean}          isFeatured
 * @property {string}           [agent]
 * @property {{ metaTitle: string, metaDescription: string, keywords: string[] }} [seo]
 * @property {string}           createdAt
 * @property {string}           updatedAt
 */

/**
 * @typedef {Object} PropertiesResponse
 * @property {Property[]} properties
 * @property {number}     page
 * @property {number}     pages
 */

/**
 * @typedef {Object} GetPropertiesParams
 * @property {string}  [keyword]
 * @property {string}  [type]        Apartment | Villa | Commercial | Land | Townhouse
 * @property {string}  [status]      For Sale | For Rent | Off-Plan
 * @property {number}  [pageNumber]
 * @property {number}  [pageSize]
 */

// ─── Public reads ─────────────────────────────────────────────────────────────

/**
 * Fetch paginated, filterable list of properties.
 * Used by Server Components — cache is tag-based so admin mutations bust it.
 *
 * @param {GetPropertiesParams} [params]
 * @returns {Promise<PropertiesResponse>}
 */
export async function getProperties(params = {}, options = {}) {
  const qs = buildQuery(params);
  return apiFetch(`/properties${qs}`, {
    ...options,
    next: { revalidate: 30, tags: ['properties'] },
  });
}

/**
 * Fetch a single property by its URL slug.
 * Longer revalidation (5 min) since detail pages change rarely.
 *
 * @param {string} slug
 * @returns {Promise<Property>}
 */
export async function getPropertyBySlug(slug) {
  return apiFetch(`/properties/${slug}`, {
    next: { revalidate: 300, tags: ['properties', `property-${slug}`] },
  });
}

// ─── Admin mutations (no caching — always live) ───────────────────────────────

/**
 * Create a new property. Requires admin session cookie.
 *
 * @param {Omit<Property, '_id'|'createdAt'|'updatedAt'>} body
 * @returns {Promise<Property>}
 */
export async function createProperty(body) {
  return apiFetch('/properties', {
    method: 'POST',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Update an existing property by ID. Requires admin session cookie.
 *
 * @param {string}              id
 * @param {Partial<Property>}   body
 * @returns {Promise<Property>}
 */
export async function updateProperty(id, body) {
  return apiFetch(`/properties/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Delete a property by ID. Requires admin session cookie.
 *
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export async function deleteProperty(id) {
  return apiFetch(`/properties/${id}`, {
    method: 'DELETE',
    cache:  'no-store',
  });
}
