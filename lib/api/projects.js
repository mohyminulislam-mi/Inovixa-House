/**
 * lib/api/projects.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All project-related API calls. Built exclusively on apiFetch (native fetch).
 *
 * Cache strategy:
 *  - Public list/detail: revalidate: 30  → tag 'projects' for instant bust
 *  - Admin mutations:    cache: 'no-store'
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch, buildQuery } from '@/lib/api';

// ─── JSDoc Types ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} PaymentPlanMilestone
 * @property {string} milestone
 * @property {number} percentage
 */

/**
 * @typedef {Object} Project
 * @property {string}                  _id
 * @property {string}                  title
 * @property {string}                  slug
 * @property {string}                  description
 * @property {string}                  developer
 * @property {'Under Construction'|'Completed'|'Upcoming'} status
 * @property {string}                  [handoverDate]
 * @property {string|Object}           [community]   Populated as { _id, name, slug, location }
 * @property {number}                  [startingPrice]
 * @property {string[]}                gallery
 * @property {PaymentPlanMilestone[]}  paymentPlan
 * @property {{ metaTitle: string, metaDescription: string, keywords: string[] }} [seo]
 * @property {string}                  createdAt
 * @property {string}                  updatedAt
 */

/**
 * @typedef {Object} ProjectsResponse
 * @property {Project[]} projects
 * @property {number}    page
 * @property {number}    pages
 * @property {number}    total
 */

/**
 * @typedef {Object} GetProjectsParams
 * @property {string} [keyword]
 * @property {string} [status]     Under Construction | Completed | Upcoming
 * @property {string} [developer]
 * @property {string} [community]  Community ObjectId
 * @property {number} [pageNumber]
 * @property {number} [pageSize]
 */

// ─── Public reads ─────────────────────────────────────────────────────────────

/**
 * Fetch paginated, filterable list of projects.
 *
 * @param {GetProjectsParams} [params]
 * @returns {Promise<ProjectsResponse>}
 */
export async function getProjects(params = {}) {
  const qs = buildQuery(params);
  return apiFetch(`/projects${qs}`, {
    next: { revalidate: 30, tags: ['projects'] },
  });
}

/**
 * Fetch a single project by slug.
 *
 * @param {string} slug
 * @returns {Promise<Project>}
 */
export async function getProjectBySlug(slug) {
  return apiFetch(`/projects/${slug}`, {
    next: { revalidate: 300, tags: ['projects', `project-${slug}`] },
  });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

/**
 * Create a new project. Requires admin session cookie.
 *
 * @param {Omit<Project, '_id'|'createdAt'|'updatedAt'>} body
 * @returns {Promise<Project>}
 */
export async function createProject(body) {
  return apiFetch('/projects', {
    method: 'POST',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Update an existing project by ID. Requires admin session cookie.
 *
 * @param {string}            id
 * @param {Partial<Project>}  body
 * @returns {Promise<Project>}
 */
export async function updateProject(id, body) {
  return apiFetch(`/projects/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(body),
    cache:  'no-store',
  });
}

/**
 * Delete a project by ID. Requires admin session cookie.
 *
 * @param {string} id
 * @returns {Promise<{ message: string }>}
 */
export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, {
    method: 'DELETE',
    cache:  'no-store',
  });
}
