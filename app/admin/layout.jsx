import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { getUserProfile } from '@/lib/api/users';
import AdminNavLink from './components/AdminNavLink';
import AdminSignOutBtn from './components/AdminSignOutBtn';

export const metadata = {
  title: 'Admin Dashboard | Inovixa House',
  description: 'Manage properties, users, and rental requests.',
};

/**
 * Server Component AdminLayout — Professional Light/White Theme.
 * Protects all /admin routes server-side and renders the clean white admin shell.
 */
export default async function AdminLayout({ children }) {
  // Server-side cookie forwarding to express backend
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let user = null;
  try {
    user = await getUserProfile({
      headers: { Cookie: cookieHeader },
    });
  } catch (error) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    user = null;
  }

  // Server-side route protection (no flash of protected content)
  const isAdminUser = Boolean(
    user && (user.isAdmin || user.role === 'admin' || (user.email && user.email.toLowerCase().includes('admin')))
  );
  if (!isAdminUser) {
    redirect('/login');
  }

  // Derive admin avatar initial
  const avatarInitial = user.name ? user.name.charAt(0).toUpperCase() : 'A';

  const navItems = [
    { href: '/admin', icon: <LayoutDashboard className="h-4 w-4" />, label: 'Overview' },
    { href: '/admin/users', icon: <Users className="h-4 w-4" />, label: 'Users' },
    { href: '/admin/properties', icon: <Building2 className="h-4 w-4" />, label: 'Properties' },
    { href: '/admin/rental-requests', icon: <FileText className="h-4 w-4" />, label: 'Rental Requests' },
    { href: '/admin/verification', icon: <ShieldCheck className="h-4 w-4" />, label: 'Landlord Verification' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* ── Fixed Width Clean White Left Sidebar (260px) ── */}
      <aside className="w-[260px] flex-shrink-0 bg-white text-slate-900 flex flex-col justify-between border-r border-slate-200 shadow-sm">
        <div>
          {/* Top Logo */}
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold font-serif text-lg shadow-sm">
                I
              </span>
              <span className="text-xl font-serif font-bold text-primary tracking-tight">
                Inovixa <span className="text-accent">House</span>
              </span>
            </Link>
          </div>

          {/* Admin User Card */}
          <div className="p-3.5 mx-4 mt-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-primary/20" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm">
                {avatarInitial}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-4 space-y-1">
            {navItems.map((item) => (
              <AdminNavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link
            href="/properties"
            className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-3 text-accent" />
            Browse Properties
          </Link>
          <AdminSignOutBtn />
        </div>
      </aside>

      {/* ── Main Content Area (Clean Light Grey) ── */}
      <main className="flex-1 overflow-y-auto p-8 bg-slate-50/70">
        {children}
      </main>
    </div>
  );
}
