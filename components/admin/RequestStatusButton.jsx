'use client';

// Rule 1 comment: useEffect not needed — status update is triggered on user button click event.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { updateRequestStatus } from '@/lib/api/rentalRequests';

/**
 * RequestStatusButton component for approving or rejecting rental applications.
 *
 * @param {Object} props
 * @param {string} props.requestId
 * @param {'approved'|'rejected'} props.targetStatus
 */
export default function RequestStatusButton({ requestId, targetStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      await updateRequestStatus(requestId, targetStatus);
      router.refresh(); // Re-fetches server data automatically
    } catch (err) {
      alert(err.message || 'Failed to update request status');
    } finally {
      setLoading(false);
    }
  };

  const isApprove = targetStatus === 'approved';

  return (
    <button
      onClick={handleUpdateStatus}
      disabled={loading}
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
        isApprove
          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
      }`}
    >
      {isApprove ? (
        <>
          <Check className="h-3.5 w-3.5 mr-1" />
          {loading ? 'Processing...' : 'Approve'}
        </>
      ) : (
        <>
          <X className="h-3.5 w-3.5 mr-1" />
          {loading ? 'Processing...' : 'Reject'}
        </>
      )}
    </button>
  );
}
