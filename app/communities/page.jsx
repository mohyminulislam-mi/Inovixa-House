import Link from 'next/link';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';

export const metadata = {
  title: 'Luxury Communities | Inovixa House',
  description: 'Explore the most prestigious and exclusive real estate communities in the UAE.',
};

export default function CommunitiesPage() {
  const communities = [
    {
      id: 1,
      name: 'Downtown Dubai',
      description: 'The vibrant heart of the city featuring iconic landmarks, luxury shopping, and world-class entertainment.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 45,
    },
    {
      id: 2,
      name: 'Palm Jumeirah',
      description: 'An architectural marvel offering exclusive beachfront villas and ultra-luxury apartments.',
      image: 'https://images.unsplash.com/photo-1613490908571-9f20c15923c8?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 32,
    },
    {
      id: 3,
      name: 'Dubai Marina',
      description: 'A spectacular waterfront community with high-rise luxury living and a lively promenade.',
      image: 'https://images.unsplash.com/photo-1582653211974-2795f9d1235b?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 58,
    },
    {
      id: 4,
      name: 'Emirates Hills',
      description: 'The Beverly Hills of Dubai, a prestigious gated community for ultra-high-net-worth individuals.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 12,
    },
    {
      id: 5,
      name: 'Business Bay',
      description: 'The central business district offering premium commercial and residential skyscrapers.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 74,
    },
    {
      id: 6,
      name: 'Arabian Ranches',
      description: 'A premium suburban desert-themed development with lush golf courses and equestrian facilities.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      propertiesCount: 25,
    }
  ];

  return (
    <div className="bg-neutral-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">Neighborhoods</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Exclusive Communities</h1>
          <p className="text-neutral-500 text-lg">
            Discover the most sought-after neighborhoods and master-planned communities tailored for a luxurious lifestyle.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community) => (
            <div key={community.id} className="premium-card group cursor-pointer flex flex-col h-[400px]">
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <img 
                  src={community.image} 
                  alt={community.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <div className="flex items-center text-accent mb-2 text-sm font-semibold uppercase tracking-wider">
                    <Building2 className="w-4 h-4 mr-2" />
                    {community.propertiesCount} Properties
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-3">
                    {community.name}
                  </h3>
                  <p className="text-neutral-300 text-sm mb-6 line-clamp-2">
                    {community.description}
                  </p>
                  <Link href={`/communities/${community.name.toLowerCase().replace(' ', '-')}`} className="inline-flex items-center text-white hover:text-accent transition-colors font-medium">
                    Explore Community <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
