import React from 'react';

/**
 * StatCard component for displaying key metric summaries in admin dashboard.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon          Icon component (Lucide icon)
 * @param {number|string}   props.value         Metric numeric or text value
 * @param {string}          props.label         Main metric label
 * @param {string}          [props.sublabel]    Secondary contextual text
 * @param {string}          [props.iconBgColor] Tailwind background color for icon badge
 */
export default function StatCard({ icon, value, label, sublabel, iconBgColor = 'bg-primary/10 text-primary' }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <h3 className="text-3xl font-bold text-neutral-900 mt-2 tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          {sublabel && (
            <p className="text-xs text-neutral-400 mt-1">{sublabel}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgColor} shadow-inner`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
