import Link from 'next/link';
import { Target, Eye, Shield, Users, Trophy, Building2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | Inovixa House',
  description: 'Learn about Inovixa House, our mission, vision, and the leadership team driving luxury real estate innovation.',
};

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Integrity', desc: 'We uphold the highest standards of honesty and transparency in every transaction.' },
    { icon: Users, title: 'Client-Centric', desc: 'Our clients are at the heart of everything we do. We prioritize your unique needs.' },
    { icon: Trophy, title: 'Excellence', desc: 'We strive for perfection, delivering premium properties and unparalleled service.' },
    { icon: Building2, title: 'Innovation', desc: 'Embracing cutting-edge technology to redefine the luxury real estate experience.' },
  ];

  const team = [
    {
      name: 'Alexander Sterling',
      role: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Victoria Vance',
      role: 'Head of Luxury Sales',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Jonathan Pierce',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Director of Marketing',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Redefining Luxury Living</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Since our inception, Inovixa House has been at the forefront of the premium real estate market, connecting discerning clients with extraordinary properties.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-neutral-50 p-12 rounded-xl border border-neutral-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-neutral-600 leading-relaxed">
                To provide an exceptional real estate experience by offering an exclusive portfolio of luxury properties, driven by deep market expertise, unwavering integrity, and a commitment to client satisfaction.
              </p>
            </div>
            
            <div className="bg-neutral-50 p-12 rounded-xl border border-neutral-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 text-accent">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-neutral-600 leading-relaxed">
                To be the undisputed global leader in luxury real estate, continuously elevating the standards of sophisticated living and shaping the architectural landscapes of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1000&q=80" 
                alt="CEO Office" 
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-accent">A Message from our CEO</h2>
              <blockquote className="text-xl font-serif italic text-neutral-300 leading-relaxed border-l-4 border-accent pl-6">
                "At Inovixa House, we don't just sell properties; we curate lifestyles. Our dedication to excellence and our passion for extraordinary design allow us to match our clients with homes that transcend the ordinary. Welcome to a new standard of luxury."
              </blockquote>
              <div>
                <p className="font-bold text-lg text-white">Alexander Sterling</p>
                <p className="text-neutral-400">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 transition-transform hover:-translate-y-2 duration-300">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">The Experts</span>
          <h2 className="text-3xl font-serif font-bold text-primary mb-16">Our Leadership Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl mb-4 h-80">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link href="/contact" className="text-accent font-semibold flex items-center text-sm">
                      Contact <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                <p className="text-neutral-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
