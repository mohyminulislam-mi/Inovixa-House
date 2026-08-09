import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-primary">
              Inovixa House
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-neutral-800 hover:text-accent font-medium transition-colors">Home</Link>
            <Link href="/properties" className="text-neutral-800 hover:text-accent font-medium transition-colors">Properties</Link>
            <Link href="/communities" className="text-neutral-800 hover:text-accent font-medium transition-colors">Communities</Link>
            <Link href="/projects" className="text-neutral-800 hover:text-accent font-medium transition-colors">Projects</Link>
            <Link href="/about" className="text-neutral-800 hover:text-accent font-medium transition-colors">About Us</Link>
            <Link href="/contact" className="text-neutral-800 hover:text-accent font-medium transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-neutral-800 hover:text-accent p-2" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/login" className="text-sm font-semibold text-neutral-800 hover:text-accent transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="btn-accent text-sm py-2 px-4">
              Sign Up
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button className="text-neutral-800 hover:text-primary focus:outline-none" aria-label="Open Menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
