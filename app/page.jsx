'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, Search } from 'lucide-react';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - In production, replace with a high-res image from Cloudinary */}
        <div className="absolute inset-0 bg-neutral-900 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-accent tracking-[0.2em] uppercase text-sm font-semibold mb-4 block"
          >
            Welcome to Inovixa House
          </motion.span>
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Discover Your Next <br/> <span className="text-accent italic">Luxury</span> Residence
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10"
          >
            Explore an exclusive collection of premium properties, villas, and commercial spaces designed for a sophisticated lifestyle.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl max-w-4xl mx-auto shadow-2xl border border-white/20 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 bg-white rounded-lg p-2 flex items-center">
              <MapPin className="text-neutral-400 ml-2 mr-3" />
              <input type="text" placeholder="Location, Community, or Project" className="w-full focus:outline-none text-neutral-800" />
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 flex items-center hidden md:flex">
              <Building2 className="text-neutral-400 ml-2 mr-3" />
              <select className="w-full focus:outline-none text-neutral-800 bg-transparent">
                <option value="">Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <button className="btn-accent py-4 px-8 flex items-center whitespace-nowrap">
              <Search className="mr-2 h-5 w-5" /> Search Properties
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">Exclusive</span>
              <h2 className="text-4xl font-serif font-bold text-primary">Featured Properties</h2>
            </div>
            <Link href="/properties" className="hidden md:flex items-center text-primary font-medium hover:text-accent transition-colors">
              View All Properties <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy Featured Property Card */}
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="premium-card group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-1613490908571-9f20c15923c8?auto=format&fit=crop&w=800&q=80`} 
                    alt="Luxury Villa" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-sm">
                    FOR SALE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">The Royal Atlantis Residence</h3>
                  <p className="text-neutral-500 text-sm mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> Palm Jumeirah, Dubai
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                    <span className="text-2xl font-bold text-primary">$4,500,000</span>
                    <span className="text-sm font-medium text-neutral-500">4 Beds | 5 Baths | 8,500 sqft</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">Our Promise</span>
          <h2 className="text-4xl font-serif font-bold text-primary mb-16">Why Choose Inovixa House</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Premium Portfolio', desc: 'Access to the most exclusive and off-market properties.' },
              { title: 'Expert Guidance', desc: 'Our seasoned agents provide unparalleled market insights.' },
              { title: 'Seamless Experience', desc: 'From viewing to closing, we ensure a smooth transaction.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border border-neutral-100 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
