import { cookies } from 'next/headers';
import { Users, Building2, Clock, Key } from 'lucide-react';
import { getAdminDashboardStats } from '@/lib/api/dashboard';
import StatCard from '@/components/admin/StatCard';
import QuickActionCard from '@/components/admin/QuickActionCard';

export const metadata = {
  title: 'Admin Overview | Inovixa House',
};

/**
 * Admin Overview page — Async Server Component.
 * Fetches stats directly via await without useEffect or useState.
 */
export default async function AdminOverviewPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let stats = {
    totalUsers: 0,
    totalProperties: 0,
    pendingRequests: 0,
    activeRentals: 0,
  };

  try {
    stats = await getAdminDashboardStats({
      headers: { Cookie: cookieHeader },
    });
  } catch (error) {
    // 401 status indicates no auth cookie — AdminLayout will redirect to /login
    if (error?.status !== 401) {
      console.error('Failed to load admin stats:', error);
    }
  }

  const statItems = [
    {
      label: 'Total Users',
      value: stats.totalUsers ?? 0,
      sublabel: 'Registered platform accounts',
      icon: <Users className="h-6 w-6" />,
      iconBgColor: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Total Properties',
      value: stats.totalProperties ?? 0,
      sublabel: 'Active & archived listings',
      icon: <Building2 className="h-6 w-6" />,
      iconBgColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Pending Requests',
      value: stats.pendingRequests ?? 0,
      sublabel: 'Awaiting admin review',
      icon: <Clock className="h-6 w-6" />,
      iconBgColor: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Active Rentals',
      value: stats.activeRentals ?? 0,
      sublabel: 'Occupied rental units',
      icon: <Key className="h-6 w-6" />,
      iconBgColor: 'bg-purple-50 text-purple-600',
    },
  ];

  const quickActions = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Manage Users',
      subtitle: 'View user roles, details & manage accounts',
      href: '/admin/users',
    },
    {
      icon: <Building2 className="h-6 w-6 text-primary" />,
      title: 'View Properties',
      subtitle: 'Manage property listings & publications',
      href: '/admin/properties',
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'View Requests',
      subtitle: 'Review & approve rental applications',
      href: '/admin/rental-requests',
    },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-neutral-900">
          Admin Overview
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome back. Here is a summary of your platform statistics today.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, idx) => (
          <StatCard
            key={idx}
            icon={item.icon}
            value={item.value}
            label={item.label}
            sublabel={item.sublabel}
            iconBgColor={item.iconBgColor}
          />
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-neutral-900">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => (
            <QuickActionCard
              key={idx}
              icon={action.icon}
              title={action.title}
              subtitle={action.subtitle}
              href={action.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
