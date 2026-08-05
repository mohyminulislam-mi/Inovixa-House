import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Luxury Properties for Sale & Rent | Inovixa House',
  description: 'Browse our exclusive collection of premium apartments, villas, and commercial properties.',
};

export default function PropertiesPage() {
  return (
    <div className="bg-neutral-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-6">Exclusive Properties</h1>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search by keywords..." 
              className="flex-1 p-3 border border-neutral-300 rounded-md focus:outline-none focus:border-accent"
            />
            <select className="p-3 border border-neutral-300 rounded-md focus:outline-none focus:border-accent bg-white">
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
            <select className="p-3 border border-neutral-300 rounded-md focus:outline-none focus:border-accent bg-white">
              <option value="">Status</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
            <button className="btn-primary px-8">Filter</button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="premium-card group cursor-pointer flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80`} 
                  alt="Property" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-primary text-white text-xs font-bold px-3 py-1 rounded-sm">
                  FOR SALE
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">Signature Villa {item}</h3>
                  <p className="text-neutral-500 text-sm mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Downtown Dubai
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-neutral-100 mt-4">
                  <span className="text-2xl font-bold text-primary">$3,200,000</span>
                  <Link href={`/properties/signature-villa-${item}`} className="text-accent hover:text-primary transition-colors flex items-center text-sm font-semibold uppercase tracking-wider">
                    Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center space-x-2">
          <button className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-primary hover:text-white transition-colors bg-white">1</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-primary hover:text-white transition-colors bg-white">2</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-primary hover:text-white transition-colors bg-white">3</button>
          <button className="px-4 py-2 border border-neutral-300 rounded-md hover:bg-primary hover:text-white transition-colors bg-white">Next &raquo;</button>
        </div>

      </div>
    </div>
  );
}
