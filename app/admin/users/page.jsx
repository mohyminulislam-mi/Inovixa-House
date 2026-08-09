import { cookies } from 'next/headers';
import { getUsers } from '@/lib/api/users';
import SearchFilter from '@/components/admin/SearchFilter';
import UsersTable from '@/components/admin/UsersTable';

export const metadata = {
  title: 'User Management | Inovixa House Admin',
};

/**
 * User Management Page — Async Server Component.
 * Accepts searchParams for search filtering server-side.
 */
export default async function AdminUsersPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search ?? '';

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let users = [];
  try {
    users = await getUsers(
      { search },
      { headers: { Cookie: cookieHeader } }
    );
  } catch (error) {
    if (error?.status !== 401) {
      console.error('Failed to load users:', error);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-neutral-900">
            User Management
          </h1>
          <p className="text-neutral-500 text-sm mt-0.5">
            Manage user roles, statuses, and account access.
          </p>
        </div>
        <SearchFilter placeholder="Search by name or email..." />
      </div>

      {/* Users Table */}
      <UsersTable users={users} />
    </div>
  );
}
