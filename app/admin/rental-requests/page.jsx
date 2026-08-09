import { cookies } from 'next/headers';
import { getRentalRequests } from '@/lib/api/rentalRequests';
import RentalRequestsTable from '@/components/admin/RentalRequestsTable';

export const metadata = {
  title: 'Rental Requests | Inovixa House Admin',
};

/**
 * Rental Requests Management Page — Async Server Component.
 * Accepts searchParams for status filtering server-side.
 */
export default async function AdminRentalRequestsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const status = resolvedParams?.status ?? '';

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let requests = [];
  try {
    const data = await getRentalRequests(
      { status },
      { headers: { Cookie: cookieHeader } }
    );
    requests = Array.isArray(data) ? data : (data.requests ?? []);
  } catch (error) {
    if (error?.status !== 401) {
      console.error('Failed to load rental requests:', error);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-neutral-900">
          Rental Requests
        </h1>
        <p className="text-neutral-500 text-sm mt-0.5">
          Review, approve, or reject incoming tenant property rental applications.
        </p>
      </div>

      {/* Requests Table */}
      <RentalRequestsTable requests={requests} />
    </div>
  );
}
