import UserBanButton from './UserBanButton';

/**
 * UsersTable component for displaying user accounts in admin dashboard.
 *
 * @param {Object} props
 * @param {Array<Object>} props.users
 */
export default function UsersTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl text-center border border-neutral-200 shadow-sm">
        <p className="text-neutral-500 font-medium">No users found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Joined Date</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{user.name}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${user.role === 'admin'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : user.role === 'agent'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isBanned
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                    }`}>
                    {user.isBanned ? 'Banned' : 'Active'}
                  </span>
                </td>
                <td className="py-4 px-6 text-neutral-500 text-xs">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4 px-6 text-right">
                  {user.role !== 'admin' && (
                    <UserBanButton userId={user._id} isBanned={user.isBanned} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
