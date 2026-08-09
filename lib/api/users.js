/**
 * lib/api/users.js
 * ─────────────────────────────────────────────────────────────────────────────
 * User authentication and admin user management API calls.
 * Built exclusively on apiFetch (native fetch).
 *
 * Cache strategy:
 *  - User profile / list: cache: 'no-store' (user/session data must always be fresh)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch, buildQuery } from '@/lib/api';

// ─── JSDoc Types ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} User
 * @property {string}  _id
 * @property {string}  name
 * @property {string}  email
 * @property {'user'|'agent'|'admin'} role
 * @property {string}  [avatar]
 * @property {boolean} [isBanned]
 * @property {string}  createdAt
 * @property {string}  updatedAt
 */

// ─── Auth endpoints ───────────────────────────────────────────────────────────

/**
 * Login user with email & password. Server sets HTTP-only JWT cookie.
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<User>}
 */
export async function loginUser(credentials) {
  return apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    cache: 'no-store',
  });
}

/**
 * Register a new user. Server sets HTTP-only JWT cookie.
 *
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @returns {Promise<User>}
 */
export async function registerUser(userData) {
  return apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
    cache: 'no-store',
  });
}

/**
 * Logout user. Server clears the HTTP-only JWT cookie.
 *
 * @returns {Promise<{ message: string }>}
 */
export async function logoutUser() {
  return apiFetch('/users/logout', {
    method: 'POST',
    cache: 'no-store',
  });
}

/**
 * Get current authenticated user's profile.
 *
 * @param {RequestInit & { headers?: Record<string, string> }} [options]
 * @returns {Promise<User>}
 */
export async function getUserProfile(options = {}) {
  return apiFetch('/users/profile', {
    ...options,
    cache: 'no-store',
  });
}

// ─── Admin user management endpoints ─────────────────────────────────────────

/**
 * Get list of all users. Admin only.
 *
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {RequestInit & { headers?: Record<string, string> }} [options]
 * @returns {Promise<User[]>}
 */
export async function getUsers(params = {}, options = {}) {
  const qs = buildQuery(params);
  return apiFetch(`/users${qs}`, {
    ...options,
    cache: 'no-store',
  });
}

/**
 * Get a specific user by ID. Admin only.
 *
 * @param {string} id
 * @returns {Promise<User>}
 */
export async function getUserById(id) {
  return apiFetch(`/users/${id}`, {
    cache: 'no-store',
  });
}

/**
 * Ban user by ID. Admin only.
 *
 * @param {string} id
 * @returns {Promise<User>}
 */
export async function banUser(id) {
  return apiFetch(`/users/${id}/ban`, {
    method: 'PATCH',
    cache: 'no-store',
  });
}

/**
 * Unban user by ID. Admin only.
 *
 * @param {string} id
 * @returns {Promise<User>}
 */
export async function unbanUser(id) {
  return apiFetch(`/users/${id}/unban`, {
    method: 'PATCH',
    cache: 'no-store',
  });
}
