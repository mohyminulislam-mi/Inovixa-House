'use client';

// Rule 1 comment: useEffect not needed — ban/unban triggered on user button click event.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ban, CheckCircle } from 'lucide-react';
import { banUser, unbanUser } from '@/lib/api/users';

/**
 * UserBanButton component for banning or unbanning a user account.
 *
 * @param {Object} props
 * @param {string}  props.userId
 * @param {boolean} props.isBanned
 */
export default function UserBanButton({ userId, isBanned }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggleBan = async () => {
    try {
      setLoading(true);
      if (isBanned) {
        await unbanUser(userId);
      } else {
        await banUser(userId);
      }
      router.refresh(); // Re-fetches server data automatically
    } catch (err) {
      alert(err.message || 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBan}
      disabled={loading}
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
        isBanned
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
      }`}
    >
      {isBanned ? (
        <>
          <CheckCircle className="h-3.5 w-3.5 mr-1" />
          {loading ? 'Processing...' : 'Unban'}
        </>
      ) : (
        <>
          <Ban className="h-3.5 w-3.5 mr-1" />
          {loading ? 'Processing...' : 'Ban'}
        </>
      )}
    </button>
  );
}
