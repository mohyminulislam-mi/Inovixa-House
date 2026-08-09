'use client';

// Rule 1 comment: useEffect used here for debouncing search input changes before navigating URL.
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

/**
 * SearchFilter component for searching & filtering admin tables via URL query params.
 *
 * @param {Object} props
 * @param {string} [props.placeholder] Search placeholder text
 */
export default function SearchFilter({ placeholder = 'Search...' }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
        params.set('page', '1'); // Reset page to 1 on new search
      } else {
        params.delete('search');
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className="relative max-w-xs w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-accent shadow-sm"
      />
    </div>
  );
}
