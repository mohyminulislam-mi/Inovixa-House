import Link from 'next/link';
import { LayoutDashboard, Home, Users, Settings, LogOut } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | Inovixa House',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <Link href="/" className="text-2xl font-serif font-bold text-accent">
            Inovixa Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/admin" className="flex items-center px-6 py-3 text-white bg-white/10 border-r-4 border-accent">
                <LayoutDashboard className="h-5 w-5 mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/properties" className="flex items-center px-6 py-3 text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                <Home className="h-5 w-5 mr-3" /> Properties
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center px-6 py-3 text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                <Users className="h-5 w-5 mr-3" /> Users
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center px-6 py-3 text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">
                <Settings className="h-5 w-5 mr-3" /> Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center text-neutral-300 hover:text-white transition-colors w-full">
            <LogOut className="h-5 w-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-neutral-800">Admin Panel</h1>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
