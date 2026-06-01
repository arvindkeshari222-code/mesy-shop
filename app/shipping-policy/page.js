export default function ShippingPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-white font-sans">
      <h1 className="text-2xl font-black uppercase tracking-[5px] mb-12 border-b border-neutral-800 pb-6">Shipping Policy</h1>
      <div className="space-y-6 text-neutral-400 text-sm leading-relaxed">
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">Processing Time</h2>
        <p>Orders are typically processed within 2-3 business days. Please note that we do not ship on weekends or holidays.</p>
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">Shipping Duration</h2>
        <p>Because we source our products globally to bring you the best quality, shipping typically takes 10-20 business days. You will receive a tracking number via email once your order has shipped.</p>
      </div>
    </div>
  );
}