'use client';

// Rule 1 comment: useEffect used here for logging runtime errors to error tracking services.
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Next.js Error Boundary for /admin routes.
 * Displays a clean fallback UI and provides a reset button to retry rendering.
 *
 * @param {Object} props
 * @param {Error & { digest?: string }} props.error
 * @param {() => void} props.reset
 */
export default function AdminError({ error, reset }) {
  useEffect(() => {
    // Log error to tracking service (e.g. Sentry)
    console.error('Admin route error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg border border-neutral-200 text-center space-y-4">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          Something went wrong
        </h2>
        <p className="text-sm text-neutral-600">
          {error?.message || 'An unexpected error occurred while loading this admin page.'}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
        </button>
      </div>
    </div>
  );
}
