'use client';

// Rule 1 comment: useEffect not needed here — usePathname handles route detection dynamically.
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * ClientNavLink component for sidebar navigation links in light/white admin theme.
 *
 * @param {Object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.icon
 * @param {string} props.label
 */
export default function AdminNavLink({ href, icon, label }) {
  const pathname = usePathname();
  
  // Exact match for /admin (Overview), subpath match for others
  const isActive = href === '/admin' 
    ? pathname === '/admin'
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white shadow-md font-semibold'
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
      }`}
    >
      <span className={`mr-3 text-lg flex-shrink-0 ${isActive ? 'text-accent' : 'text-neutral-400'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
