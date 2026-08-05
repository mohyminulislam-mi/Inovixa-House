'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, Phone, Mail, Clock, Send, Calendar } from 'lucide-react';
import axios from 'axios';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(8, { message: 'Phone number is required' }),
  visitDate: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Assuming a backend route /api/messages exists (would be created in a real backend)
      // For now, simulate a successful network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form Data:', data);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully. Our team will contact you shortly.',
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-accent uppercase tracking-wider text-sm font-bold mb-2 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Contact & Schedule Visit</h1>
          <p className="text-neutral-500 text-lg">
            Our luxury property consultants are ready to assist you. Send us a message or schedule a private viewing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          
          {/* Contact Information (Left) */}
          <div className="lg:w-1/3 bg-primary text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8 text-accent">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Our Office</h3>
                    <p className="text-neutral-300">123 Luxury Avenue, Business Bay<br/>Dubai, UAE</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Phone Number</h3>
                    <p className="text-neutral-300">+971 4 123 4567<br/>+971 50 987 6543 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email Address</h3>
                    <p className="text-neutral-300">info@inovixahouse.com<br/>sales@inovixahouse.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-accent mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Business Hours</h3>
                    <p className="text-neutral-300">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:w-2/3 p-10">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Send a Message</h2>
            
            {submitStatus && (
              <div className={`p-4 rounded-md mb-6 ${submitStatus.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-neutral-300'}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-neutral-300'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${errors.phone ? 'border-red-500' : 'border-neutral-300'}`}
                    placeholder="+971 50 123 4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Visit Date */}
                <div>
                  <label htmlFor="visitDate" className="block text-sm font-medium text-neutral-700 mb-1">Preferred Visit Date (Optional)</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="visitDate"
                      {...register('visitDate')}
                      className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Your Message *</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${errors.message ? 'border-red-500' : 'border-neutral-300'}`}
                  placeholder="I am interested in scheduling a visit..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto px-10 py-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-neutral-200 w-full h-[400px] rounded-xl overflow-hidden border border-neutral-300 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-neutral-500 font-medium">Google Maps Embed Placeholder</p>
          </div>
          {/* In production, embed the real Google Map iframe here */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115456.9754320959!2d55.191753949747976!3d25.265011746684784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-10"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
