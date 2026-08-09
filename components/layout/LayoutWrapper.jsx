'use client';

// Rule 1 comment: useEffect not needed — usePathname dynamically detects current route path.
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * LayoutWrapper conditionally renders website Navbar & Footer.
 * Hides Navbar and Footer when accessing /admin routes.
 */
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="flex-grow">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
