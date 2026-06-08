'use client';
import React, { useState } from 'react';

// 🎯 DHYAN DEIN: F aur AQ Capital hona chahiye!
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How long does shipping take for international orders?",
      answer: "Standard international shipping typically takes 5 to 9 business days. All orders are processed within 24 to 48 hours from our global fulfillment network, and a tracking link will be sent directly to your email as soon as your package dispatches."
    },
    {
      question: "Can I track my package after dispatch?",
      answer: "Yes, absolutely. Once your order leaves our warehouse, you will receive an automated shipping confirmation email containing your tracking number and a link to trace your delivery in real-time."
    },
    {
      question: "What is your returns and refund policy?",
      answer: "We offer a 30-day premium return policy for all unused items in their original packaging. If your item arrives damaged or you experience any manufacturing issues, please contact us immediately at mesyshop1@gmail.com for a complimentary replacement or full refund."
    },
    {
      question: "Are there any hidden customs fees or import taxes?",
      answer: "No, the price displayed at checkout is final. We handle all import duties, custom clearances, and logistics taxes for our international buyers, ensuring a direct and hassle-free delivery right to your doorstep."
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer: "Since we aim to process and dispatch all orders within 24 hours, modifications can only be made if you contact our concierge team immediately. Please email us at mesyshop1@gmail.com with your order number as soon as possible."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major secure international payment systems, including credit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and other encrypted checkout options for a safe shopping experience."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 px-6 py-16 md:py-24 font-sans selection:bg-zinc-100">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium block mb-3">
            Questions & Answers
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6">
            Frequently Asked.
          </h1>
          <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about our premium collections, worldwide shipping concierge, and support.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-zinc-200">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-zinc-200 py-5">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="text-sm md:text-base font-normal tracking-wide text-zinc-800 group-hover:text-zinc-900 transition-colors">
                    {item.question}
                  </span>
                  <span className="text-lg font-light text-zinc-400 ml-4">
                    {isOpen ? "—" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed pr-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-20 text-center bg-zinc-50 border border-zinc-100 p-8">
          <h3 className="text-sm font-medium tracking-wide text-zinc-800 mb-2">Still have questions?</h3>
          <p className="text-xs text-zinc-500 font-light mb-4">Our global support concierge is active 24/7 to assist you.</p>
          <p className="text-xs font-medium text-zinc-900 tracking-wider uppercase">
            Email: <span className="underline select-all">mesyshop1@gmail.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}