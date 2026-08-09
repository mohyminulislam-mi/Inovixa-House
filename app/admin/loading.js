/**
 * app/admin/loading.js
 * Next.js convention — automatically displayed while Admin Overview Server Component fetches data.
 */
export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-48 bg-neutral-300 rounded-md mb-2"></div>
        <div className="h-4 w-72 bg-neutral-200 rounded-md"></div>
      </div>

      {/* 4 Skeleton Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-neutral-200 rounded"></div>
                <div className="h-8 w-16 bg-neutral-300 rounded"></div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-neutral-200"></div>
            </div>
            <div className="h-3 w-32 bg-neutral-150 rounded"></div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-36 bg-neutral-300 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 h-24"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
