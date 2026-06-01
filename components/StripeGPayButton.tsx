"use client";
import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function StripeGPayButton({ price, productName }: { price: string; productName: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: productName,
        amount: Math.round(parseFloat(price) * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (ev) => {
      try {
        const res = await fetch('/checkout/stripe-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: Math.round(parseFloat(price) * 100) }),
        });
        
        const { clientSecret } = await res.json();

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (error) {
          ev.complete('fail');
          alert(`Payment Error: ${error.message}`);
        } else if (paymentIntent.status === 'succeeded') {
          ev.complete('success');
          alert('Transaction secured beautifully via Google Pay!');
          window.location.reload();
        }
      } catch (err) {
        ev.complete('fail');
        console.error("Stripe routing error:", err);
      }
    });
  }, [stripe, price, productName]);

  // LOCALHOST BYPASS: Jab tak localhost bina HTTPS ke hai, tab tak testing ke liye black button dikhega
  if (!paymentRequest) {
    return (
      <button 
        type="button"
        onClick={async () => {
          try {
            const res = await fetch('/checkout/stripe-intent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: Math.round(parseFloat(price) * 100) }),
            });
            const data = await res.json();
            if (data.clientSecret) {
              alert(`🔥 Backend Connection Success! ClientSecret Generated: ${data.clientSecret.substring(0, 20)}...`);
            } else {
              alert("Backend se response aaya par secret nahi mila!");
            }
          } catch (err) {
            alert("Backend connectivity crash! Check your route or terminal.");
          }
        }}
        className="w-full py-3.5 bg-black text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-[#C5A358] transition-all my-2 cursor-pointer"
      >
        Buy with Google Pay (Local Test Mode)
      </button>
    );
  }

  return (
    <div className="w-full z-10 relative my-3">
      <PaymentRequestButtonElement options={{ paymentRequest }} />
    </div>
  );
}