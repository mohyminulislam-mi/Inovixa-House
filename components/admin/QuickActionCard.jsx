import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * QuickActionCard component for quick navigation shortcuts in admin dashboard.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon     Lucide icon component
 * @param {string}          props.title    Action title
 * @param {string}          props.subtitle Action description
 * @param {string}          props.href     Target route URL
 */
export default function QuickActionCard({ icon, title, subtitle, href }) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl p-6 shadow-sm border border-neutral-200 hover:border-accent hover:shadow-md transition-all flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-100 text-primary group-hover:bg-accent/20 group-hover:text-primary flex items-center justify-center transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
