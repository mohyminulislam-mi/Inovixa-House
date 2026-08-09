import Link from 'next/link';
import { Edit } from 'lucide-react';
import PropertyDeleteButton from './PropertyDeleteButton';

/**
 * PropertiesTable component for rendering property listings in admin dashboard.
 *
 * @param {Object} props
 * @param {Array<Object>} props.properties
 */
export default function PropertiesTable({ properties }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl text-center border border-neutral-200 shadow-sm">
        <p className="text-neutral-500 font-medium">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <th className="py-4 px-6">Property</th>
              <th className="py-4 px-6">Type</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={property.featuredImage || property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&auto=format&fit=crop&q=60'}
                      alt={property.title}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">{property.title}</p>
                      <p className="text-xs text-neutral-400 font-mono">/properties/{property.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md">
                    {property.propertyType}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    property.status === 'For Sale'
                      ? 'bg-blue-100 text-blue-800'
                      : property.status === 'For Rent'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold text-neutral-900">
                  ${property.price?.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-neutral-500 text-xs truncate max-w-xs">
                  {property.location?.city || property.location?.address || 'UAE'}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      href={`/admin/properties/edit/${property._id}`}
                      className="p-1.5 text-neutral-400 hover:text-accent hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Edit Property"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <PropertyDeleteButton propertyId={property._id} title={property.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
