'use client';
import React, { useState } from 'react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aapka form handle ho gaya bina page crash ya error ke
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 px-6 py-16 md:py-24 font-sans selection:bg-zinc-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium block mb-3">
            Customer Care
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6">
            We are here to help.
          </h1>
          <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
            Have questions about our LED Drawing Pads or need assistance with an international order? Our concierge team is at your service.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          
          {/* Left Side: Minimal Contact Info */}
          <div className="md:col-span-5 space-y-10 border-b md:border-b-0 pb-10 md:pb-0 border-zinc-100">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-3">
                Digital Concierge
              </h3>
              <p className="text-base font-light text-zinc-800">
                support@mesy.shop
              </p>
              <p className="text-xs text-zinc-400 font-light mt-1">
                We respond within 12 to 24 hours.
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-3">
                HQ Address
              </h3>
              <p className="text-base font-light text-zinc-800 leading-relaxed">
                350 5th Ave,<br />
                Manhattan, New York, NY 10118<br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-3">
                Operating Hours
              </h3>
              <p className="text-base font-light text-zinc-800">
                Monday — Saturday
              </p>
              <p className="text-xs text-zinc-400 font-light mt-1">
                9:00 AM — 6:00 PM (EST)
              </p>
            </div>
          </div>

          {/* Right Side: Modern Minimalist Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="bg-zinc-50 border border-zinc-100 p-8 text-center animate-fade-in">
                <h3 className="text-lg font-light tracking-wide text-zinc-900 mb-2">Thank you for reaching out.</h3>
                <p className="text-sm text-zinc-500 font-light">Our concierge team has received your message and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                    Message
                  </label>
                  <textarea 
                    rows="5" 
                    required
                    placeholder="How can we assist you today?"
                    className="w-full bg-zinc-50 border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-zinc-900 text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-zinc-800 transition-colors rounded-none"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-24 pt-8 border-t border-zinc-100 text-center">
          <p className="text-xs text-zinc-400 font-light tracking-wide">
            © {new Date().getFullYear()} MESY Global. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}