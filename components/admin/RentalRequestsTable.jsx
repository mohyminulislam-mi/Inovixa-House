import RequestStatusButton from './RequestStatusButton';

/**
 * RentalRequestsTable component for displaying rental applications in admin dashboard.
 *
 * @param {Object} props
 * @param {Array<Object>} props.requests
 */
export default function RentalRequestsTable({ requests }) {
  if (!requests || requests.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl text-center border border-neutral-200 shadow-sm">
        <p className="text-neutral-500 font-medium">No rental requests found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <th className="py-4 px-6">Applicant</th>
              <th className="py-4 px-6">Property</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Submitted Date</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm">
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-semibold text-neutral-900">{req.applicantName || req.name}</p>
                    <p className="text-xs text-neutral-500">{req.applicantEmail || req.email}</p>
                    {(req.applicantPhone || req.phone) && (
                      <p className="text-xs text-neutral-400">{req.applicantPhone || req.phone}</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-neutral-900">
                      {req.property?.title || 'Unknown Property'}
                    </p>
                    {req.property?.price && (
                      <p className="text-xs text-neutral-500">${req.property.price.toLocaleString()}/mo</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    req.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-neutral-500 text-xs">
                  {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-4 px-6 text-right">
                  {req.status === 'pending' && (
                    <div className="flex items-center justify-end space-x-2">
                      <RequestStatusButton requestId={req._id} targetStatus="approved" />
                      <RequestStatusButton requestId={req._id} targetStatus="rejected" />
                    </div>
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
