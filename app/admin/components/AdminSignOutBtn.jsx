'use client';

// Rule 1 comment: useEffect not needed — logout action is triggered on user button click event.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutUser } from '@/lib/api/users';

/**
 * AdminSignOutBtn component for ending admin session in light theme.
 */
export default function AdminSignOutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center w-full px-4 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-100"
    >
      <LogOut className="h-4 w-4 mr-3 text-rose-500" />
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
