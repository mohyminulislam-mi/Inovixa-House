'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Building2, MapPin, Search, BedDouble, Bath, Maximize2, Tag, Clock } from 'lucide-react';

const LATEST_PROPERTIES = [
  {
    id: 1,
    title: 'Skyline Penthouse Suite',
    location: 'Downtown Dubai, UAE',
    price: '$3,200,000',
    type: 'For Sale',
    badge: 'New',
    category: 'Apartment',
    beds: 3,
    baths: 4,
    sqft: '5,200',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Marina Bay Garden Villa',
    location: 'Dubai Marina, UAE',
    price: '$8,750/mo',
    type: 'For Rent',
    badge: 'Hot',
    category: 'Villa',
    beds: 5,
    baths: 6,
    sqft: '9,800',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'The Ivory Heights Apartment',
    location: 'Business Bay, Dubai',
    price: '$1,850,000',
    type: 'For Sale',
    badge: 'New',
    category: 'Apartment',
    beds: 2,
    baths: 3,
    sqft: '3,100',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Emerald Coast Private Villa',
    location: 'Palm Jumeirah, Dubai',
    price: '$12,500,000',
    type: 'For Sale',
    badge: 'Exclusive',
    category: 'Villa',
    beds: 7,
    baths: 8,
    sqft: '14,200',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'The Grand Luxe Studio',
    location: 'Jumeirah Village Circle',
    price: '$3,200/mo',
    type: 'For Rent',
    badge: 'New',
    category: 'Apartment',
    beds: 1,
    baths: 1,
    sqft: '1,400',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Oasis Commercial Tower',
    location: 'DIFC, Dubai',
    price: '$5,900,000',
    type: 'For Sale',
    badge: 'New',
    category: 'Commercial',
    beds: null,
    baths: null,
    sqft: '11,600',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
  },
];

const FILTERS = ['All', 'For Sale', 'For Rent'];

const BADGE_STYLES = {
  New:       'bg-emerald-500 text-white',
  Hot:       'bg-rose-500 text-white',
  Exclusive: 'bg-accent text-primary',
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? LATEST_PROPERTIES
    : LATEST_PROPERTIES.filter((p) => p.type === activeFilter);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── Hero Section ── */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
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
            <div className="flex-1 bg-white rounded-lg p-2 items-center hidden md:flex">
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

      {/* ── Featured Properties ── */}
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
                    src="https://images.unsplash.com/photo-1613490908571-9f20c15923c8?auto=format&fit=crop&w=800&q=80"
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

      {/* ══════════════════════════════════════════
          Latest Properties Section
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-accent uppercase tracking-wider text-sm font-bold mb-2">
                <Clock className="h-4 w-4" /> Just Listed
              </span>
              <h2 className="text-4xl font-serif font-bold text-primary leading-tight">
                Latest Properties
              </h2>
              <p className="text-neutral-500 mt-2 max-w-md">
                Freshly added listings hand-picked by our experts — explore what&apos;s new on the market today.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-xl self-start md:self-auto"
            >
              {FILTERS.map((f) => (
                <button
                  key={f}
                  id={`filter-${f.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeFilter === f
                      ? 'bg-primary text-white shadow-md'
                      : 'text-neutral-500 hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Property Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((property, idx) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="premium-card group cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* Badge — New / Hot / Exclusive */}
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full tracking-wide ${BADGE_STYLES[property.badge] ?? 'bg-neutral-700 text-white'}`}>
                      {property.badge}
                    </span>

                    {/* Type tag */}
                    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
                      property.type === 'For Sale'
                        ? 'bg-primary/90 text-white'
                        : 'bg-emerald-600/90 text-white'
                    }`}>
                      {property.type}
                    </span>

                    {/* Category pill */}
                    <span className="absolute bottom-3 left-4 inline-flex items-center gap-1 text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      <Tag className="h-3 w-3" /> {property.category}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-serif font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300 leading-snug">
                      {property.title}
                    </h3>
                    <p className="text-neutral-400 text-sm flex items-center gap-1 mb-4">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      {property.location}
                    </p>

                    {/* Specs row */}
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-5">
                      {property.beds !== null && (
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="h-4 w-4 text-accent" />
                          {property.beds} Bed{property.beds > 1 ? 's' : ''}
                        </span>
                      )}
                      {property.baths !== null && (
                        <span className="flex items-center gap-1.5">
                          <Bath className="h-4 w-4 text-accent" />
                          {property.baths} Bath{property.baths > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="h-4 w-4 text-accent" />
                        {property.sqft} sqft
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                      <div>
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Price</p>
                        <p className="text-xl font-bold text-primary">{property.price}</p>
                      </div>
                      <Link
                        href={`/properties/${property.id}`}
                        id={`view-property-${property.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-primary border border-accent hover:bg-accent/10 px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        View Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              href="/properties"
              id="view-all-latest-properties"
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 text-base"
            >
              View All Latest Listings <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

        </div>
      </section>
      {/* ══════════════════════════════════════════ */}

      {/* ── Why Choose Us ── */}
      <section className="py-24 bg-neutral-100">
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
                className="p-8 border border-neutral-200 bg-white rounded-xl hover:shadow-lg transition-shadow"
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
