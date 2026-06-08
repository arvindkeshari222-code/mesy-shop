'use client';
import React, { useState } from 'react';

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: null, message: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: null, message: "" });

    const formData = new FormData(e.target);
    
    // 🎯 REAL WEB3FORMS KEY AUTOMATICALLY INTEGRATED HERE
    formData.append("access_key", "4c4b3156-24e5-4bcb-9231-c949f638bc8b");
    formData.append("subject", "New Customer Message from MESY Shop");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ 
          success: true, 
          message: "Thank you! Your message has been sent successfully to our concierge team." 
        });
        e.target.reset(); // Message send hone ke baad form khali karne ke liye
      } else {
        setSubmitResult({ 
          success: false, 
          message: data.message || "Something went wrong. Please try again." 
        });
      }
    } catch (error) {
      setSubmitResult({ 
        success: false, 
        message: "Network error. Please check your internet connection and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Have questions about our luxury collections or need assistance with an international order? Fill out the secure form below.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          
          {/* Left Side: Luxury Contact Info */}
          <div className="md:col-span-5 space-y-10 border-b md:border-b-0 pb-10 md:pb-0 border-zinc-100">
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-2">
                Digital Concierge Email
              </h3>
              <p className="text-base font-light text-zinc-800">support@mesy.shop</p>
              <p className="text-xs text-zinc-400 font-light mt-1">
                We respond within 12 to 24 hours.
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-2">
                HQ Address
              </h3>
              <p className="text-base font-light text-zinc-800 leading-relaxed">
                350 5th Ave,<br />
                Manhattan, New York, NY 10118<br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-zinc-400 font-medium mb-2">
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

          {/* Right Side: Real Functional Form */}
          <div className="md:col-span-7 bg-zinc-50 border border-zinc-100 p-8 md:p-10">
            <h3 className="text-lg font-light tracking-wide text-zinc-900 mb-6">
              Send a Secure Message
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full bg-white border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="e.g. john@example.com"
                    className="w-full bg-white border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 font-light mb-2">
                  Message
                </label>
                <textarea 
                  rows="5" 
                  name="message"
                  required
                  placeholder="How can our atelier assist you today?"
                  className="w-full bg-white border border-zinc-200 text-sm font-light px-4 py-3 rounded-none focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Status Notifications */}
              {submitResult.success === true && (
                <p className="text-xs text-green-600 font-medium bg-green-50 border border-green-100 p-3">{submitResult.message}</p>
              )}
              {submitResult.success === false && (
                <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 p-3">{submitResult.message}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-zinc-900 text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-zinc-800 transition-colors rounded-none disabled:bg-zinc-400"
              >
                {isSubmitting ? "Sending..." : "Submit Form"}
              </button>
            </form>
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