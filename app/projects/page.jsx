import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Off-Plan & New Projects | Inovixa House',
  description: 'Invest in the future with our curated selection of exclusive off-plan and newly developed projects.',
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'Oasis Luxury Towers',
      developer: 'Emaar Properties',
      location: 'Downtown Dubai',
      status: 'Under Construction',
      handover: 'Q4 2027',
      price: 'From $1.2M',
      image: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Azure Beach Residences',
      developer: 'Nakheel',
      location: 'Palm Jumeirah',
      status: 'Upcoming',
      handover: 'Q1 2028',
      price: 'From $3.5M',
      image: 'https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'The Verde Villas',
      developer: 'Damac Properties',
      location: 'Dubai Hills Estate',
      status: 'Completed',
      handover: 'Ready to move',
      price: 'From $4.8M',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Marina Heights',
      developer: 'Select Group',
      location: 'Dubai Marina',
      status: 'Under Construction',
      handover: 'Q2 2026',
      price: 'From $900K',
      image: 'https://images.unsplash.com/photo-1582653211974-2795f9d1235b?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">Investments</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Off-Plan Projects</h1>
          <p className="text-neutral-500 text-lg max-w-3xl">
            Secure high ROI and premium living spaces by investing in our curated portfolio of the most anticipated upcoming developments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-neutral-200">
          <button className="px-6 py-2 bg-primary text-white rounded-full font-medium">All Projects</button>
          <button className="px-6 py-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-full font-medium transition-colors">Under Construction</button>
          <button className="px-6 py-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-full font-medium transition-colors">Upcoming</button>
          <button className="px-6 py-2 bg-neutral-100 text-neutral-600 hover:bg-neutral-200 rounded-full font-medium transition-colors">Ready</button>
        </div>

        {/* Projects List View */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col md:flex-row bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              {/* Project Image */}
              <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide shadow-sm">
                  {project.status}
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-8 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-primary mb-1">{project.title}</h2>
                      <p className="text-accent font-semibold">{project.developer}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-neutral-500 mb-1">Starting From</span>
                      <span className="text-2xl font-bold text-primary">{project.price}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center text-neutral-600">
                      <MapPin className="w-5 h-5 mr-3 text-neutral-400" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-neutral-600">
                      <Calendar className="w-5 h-5 mr-3 text-neutral-400" />
                      <span>Handover: {project.handover}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between items-center">
                  <span className="text-sm text-neutral-500">Flexible Payment Plans Available</span>
                  <Link href={`/projects/${project.id}`} className="btn-primary">
                    View Project Details
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
