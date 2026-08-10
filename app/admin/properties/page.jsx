import Link from 'next/link';
import { cookies } from 'next/headers';
import { getProperties } from '@/lib/api/properties';
import SearchFilter from '@/components/admin/SearchFilter';
import PropertiesTable from '@/components/admin/PropertiesTable';
import Pagination from '@/components/admin/Pagination';
import AddPropertyButton from '@/components/admin/AddPropertyButton';

export const metadata = {
  title: 'Property Management | Inovixa House Admin',
};

/**
 * Property Management Page — Async Server Component.
 * Fetches properties via getProperties using URL query parameters.
 */
export default async function AdminPropertiesPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const keyword = resolvedParams?.search ?? '';
  const pageNumber = Number(resolvedParams?.page) || 1;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let properties = [];
  let page = 1;
  let pages = 1;

  try {
    const data = await getProperties(
      { keyword, pageNumber, pageSize: 8 },
      { headers: { Cookie: cookieHeader } }
    );
    properties = data.properties ?? [];
    page = data.page ?? 1;
    pages = data.pages ?? 1;
  } catch (error) {
    if (error?.status !== 401) {
      console.error('Failed to load properties:', error);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-neutral-900">
            Property Management
          </h1>
          <p className="text-neutral-500 text-sm mt-0.5">
            Manage property listings, edit descriptions, or add new residences.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <SearchFilter placeholder="Search properties..." />
          <AddPropertyButton />
        </div>
      </div>

      {/* Properties Table & Pagination */}
      <div>
        <PropertiesTable properties={properties} />
        <Pagination currentPage={page} totalPages={pages} />
      </div>
    </div>
  );
}
