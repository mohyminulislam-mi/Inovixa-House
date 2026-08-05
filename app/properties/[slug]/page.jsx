import { MapPin, Bed, Bath, Square, Calendar, Download, Share2 } from 'lucide-react';

export async function generateMetadata({ params }) {
  // In a real app, fetch property data here to generate dynamic SEO tags
  return {
    title: `${params.slug} | Inovixa House`,
    description: `Details for ${params.slug}`,
  };
}

export default function PropertyDetails({ params }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner / Gallery Header */}
      <div className="relative h-[60vh] md:h-[70vh] w-full group">
        <img 
          src="https://images.unsplash.com/photo-1613490908571-9f20c15923c8?auto=format&fit=crop&w=2000&q=80" 
          alt="Property Main"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <span className="bg-accent text-primary px-3 py-1 rounded-sm text-sm font-bold uppercase tracking-wider mb-4 inline-block">For Sale</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">The Royal Atlantis Residence</h1>
            <p className="text-neutral-200 flex items-center text-lg">
              <MapPin className="mr-2 h-5 w-5" /> Palm Jumeirah, Dubai
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Key Stats */}
          <div className="flex flex-wrap gap-8 border-b border-neutral-200 pb-8">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-sm uppercase tracking-wider mb-1">Price</span>
              <span className="text-3xl font-bold text-primary">$4,500,000</span>
            </div>
            <div className="hidden md:block w-px bg-neutral-200"></div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neutral-100 rounded-full text-primary"><Bed /></div>
              <div>
                <span className="block text-2xl font-bold text-primary">4</span>
                <span className="text-xs text-neutral-500 uppercase">Beds</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neutral-100 rounded-full text-primary"><Bath /></div>
              <div>
                <span className="block text-2xl font-bold text-primary">5</span>
                <span className="text-xs text-neutral-500 uppercase">Baths</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neutral-100 rounded-full text-primary"><Square /></div>
              <div>
                <span className="block text-2xl font-bold text-primary">8,500</span>
                <span className="text-xs text-neutral-500 uppercase">Sq Ft</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Property Overview</h2>
            <div className="prose max-w-none text-neutral-600 leading-relaxed">
              <p>Experience unparalleled luxury in this stunning Signature Villa located on the prestigious Palm Jumeirah. Offering sweeping views of the Arabian Gulf and the Dubai skyline, this residence redefines modern elegance.</p>
              <p>The interior features open-concept living spaces, floor-to-ceiling windows, and premium finishes throughout. A chef's kitchen, private home theater, and infinity pool make this property perfect for entertaining.</p>
            </div>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Amenities & Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Private Pool', 'Smart Home System', 'Maid Room', 'Private Beach Access', '24/7 Security', 'Gymnasium'].map((amenity, idx) => (
                <div key={idx} className="flex items-center text-neutral-700">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  {amenity}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          {/* Agent Contact Card */}
          <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 sticky top-28 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b border-neutral-200 pb-4">Interested in this property?</h3>
            <div className="flex items-center mb-6">
              <img src="https://ui-avatars.com/api/?name=Agent+Name&background=1A365D&color=fff" alt="Agent" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h4 className="font-bold text-primary">Sarah Jenkins</h4>
                <p className="text-sm text-neutral-500">Senior Luxury Consultant</p>
              </div>
            </div>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-md border border-neutral-300 focus:outline-none focus:border-accent" required />
              <input type="email" placeholder="Your Email" className="w-full p-3 rounded-md border border-neutral-300 focus:outline-none focus:border-accent" required />
              <input type="tel" placeholder="Your Phone" className="w-full p-3 rounded-md border border-neutral-300 focus:outline-none focus:border-accent" required />
              <textarea placeholder="I am interested in..." className="w-full p-3 rounded-md border border-neutral-300 focus:outline-none focus:border-accent h-24" required></textarea>
              <button className="w-full btn-primary py-3">Schedule a Visit</button>
            </form>
            <div className="mt-6 flex justify-between items-center text-sm">
              <button className="flex items-center text-neutral-600 hover:text-primary transition-colors">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </button>
              <button className="flex items-center text-neutral-600 hover:text-primary transition-colors">
                <Download className="w-4 h-4 mr-2" /> Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
