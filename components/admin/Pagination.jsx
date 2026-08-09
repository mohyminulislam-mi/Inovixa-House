'use client';

// Rule 1 comment: useEffect not needed — page navigation triggered directly on click event.
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination component for updating page query parameter (?page=N).
 *
 * @param {Object} props
 * @param {number} props.currentPage
 * @param {number} props.totalPages
 */
export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-6 py-4 rounded-b-xl">
      <p className="text-xs text-neutral-500">
        Page <span className="font-semibold text-neutral-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-neutral-900">{totalPages}</span>
      </p>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
