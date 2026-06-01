"use client";
import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext'; 
import { useRouter } from 'next/navigation';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart(); 
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex justify-end">
      {/* Premium Blur Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer Panel - Added Rounded Corners on left side for Luxury Feel */}
      <div className="relative w-full max-w-[440px] bg-white h-[96vh] my-[2vh] mr-[2vh] shadow-2xl flex flex-col rounded-[32px] border border-gray-100 overflow-hidden animate-in slide-in-from-right duration-500 z-50">
        
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#C5A358]" />
            <h2 className="text-xs font-black uppercase tracking-[3px] text-black">
              Your Atelier Bag ({cart.length})
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
              <ShoppingBag size={32} strokeWidth={1} className="text-gray-300" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">Your bag is empty</p>
            </div>
          ) : (
            cart.map((item: any, idx: number) => (
              <div key={`${item.id}-${idx}`} className="flex gap-5 items-center bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100 group animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
                
                {/* 🟢 FIXED IMAGE LAYOUT FOR SQUARES (CONTAIN & PADDING) */}
                <div className="w-20 h-24 bg-white rounded-[16px] flex items-center justify-center overflow-hidden border border-gray-100 p-2 shrink-0 shadow-sm">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain select-none" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-1 h-24 min-w-0 pr-6">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-neutral-800 line-clamp-1 leading-tight pr-2">
                      {item.name}
                    </h3>
                    {item.options && Object.entries(item.options).map(([key, val]: any) => (
                      <p key={key} className="text-[9px] text-gray-400 uppercase tracking-widest">{key}: {val}</p>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-end mt-2">
                    {/* Solid Black Quantity Selector Matrix */}
                    <div className="flex items-center border border-black rounded-full px-2.5 py-1 gap-3 bg-white font-black text-black">
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-black hover:text-gray-500 transition-colors active:scale-90"
                      >
                        <Minus size={10} strokeWidth={2.5} />
                      </button>
                      
                      <span className="text-[11px] font-bold text-black min-w-[10px] text-center">
                        {item.quantity}
                      </span>
                      
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-black hover:text-gray-500 transition-colors active:scale-90"
                      >
                        <Plus size={10} strokeWidth={2.5} />
                      </button>
                    </div>
                    
                    <span className="text-xs font-black italic text-black tracking-tighter">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* 🔴 FIXED REMOVE TRASH BUTTON: POSITIONED PERFECTLY TO AVOID OVERLAP */}
                <button 
                  type="button"
                  onClick={() => removeFromCart(item.id)} 
                  className="absolute top-4 right-4 p-1 rounded-full text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-white space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-[2px]">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-black text-xl font-light tracking-tighter">
                <span className="font-serif italic">Estimated Total</span>
                <span className="font-bold">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[3px] rounded-full hover:bg-[#C5A358] transition-all duration-500 flex items-center justify-center gap-3 group shadow-xl shadow-black/5"
              >
                Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;