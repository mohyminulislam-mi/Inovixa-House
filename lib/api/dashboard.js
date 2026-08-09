/**
 * lib/api/dashboard.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Dashboard aggregated statistics API calls. Built on native fetch wrapper apiFetch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { apiFetch } from '@/lib/api';

/**
 * @typedef {Object} AdminDashboardStats
 * @property {number} totalUsers
 * @property {number} totalProperties
 * @property {number} pendingRequests
 * @property {number} activeRentals
 */

/**
 * Fetch aggregated admin dashboard counts in one single request.
 *
 * @param {RequestInit & { headers?: Record<string, string> }} [options]
 * @returns {Promise<AdminDashboardStats>}
 */
export async function getAdminDashboardStats(options = {}) {
  return apiFetch('/admin/dashboard-stats', {
    ...options,
    cache: 'no-store',
  });
}

/**
 * Fetch detailed dashboard stats.
 *
 * @param {RequestInit & { headers?: Record<string, string> }} [options]
 * @returns {Promise<Object>}
 */
export async function getDashboardStats(options = {}) {
  return apiFetch('/dashboard/stats', {
    ...options,
    cache: 'no-store',
  });
}
