import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <Link href="/" className="text-2xl font-serif font-bold text-accent mb-6 inline-block">
              Inovixa House
            </Link>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              Experience the pinnacle of luxury real estate. We offer exclusive properties tailored to your sophisticated lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-accent transition-colors font-semibold">FB</a>
              <a href="#" className="text-neutral-300 hover:text-accent transition-colors font-semibold">TW</a>
              <a href="#" className="text-neutral-300 hover:text-accent transition-colors font-semibold">IG</a>
              <a href="#" className="text-neutral-300 hover:text-accent transition-colors font-semibold">LI</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/properties" className="text-neutral-300 hover:text-accent transition-colors">Properties</Link></li>
              <li><Link href="/communities" className="text-neutral-300 hover:text-accent transition-colors">Communities</Link></li>
              <li><Link href="/projects" className="text-neutral-300 hover:text-accent transition-colors">Ongoing Projects</Link></li>
              <li><Link href="/services" className="text-neutral-300 hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link href="/blog" className="text-neutral-300 hover:text-accent transition-colors">Real Estate News</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">123 Luxury Avenue, Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span className="text-neutral-300">+971 4 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                <span className="text-neutral-300">info@inovixahouse.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Newsletter</h3>
            <p className="text-neutral-300 mb-4">Subscribe to our newsletter to receive the latest updates on premium properties.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-l-md text-neutral-900 focus:outline-none"
                required
              />
              <button type="submit" className="bg-accent text-primary px-4 py-2 rounded-r-md font-semibold hover:bg-opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Inovixa House. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-neutral-400 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-neutral-400 hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
