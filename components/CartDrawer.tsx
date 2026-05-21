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
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-[450px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#C5A358]" />
            <h2 className="text-sm font-black uppercase tracking-widest text-black">
              Your Atelier Bag ({cart.length})
            </h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <ShoppingBag size={40} className="text-gray-200" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your bag is empty</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2">
                <div className="w-24 h-24 bg-gray-50 rounded-sm flex items-center justify-center border border-gray-100 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 leading-tight pr-4">{item.name}</h3>
                      {item.options && Object.entries(item.options).map(([key, val]: any) => (
                        <p key={key} className="text-[10px] text-gray-400 uppercase font-bold">{key}: {val}</p>
                      ))}
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} className="text-gray-300 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    {/* 🚨 FIXED LOGIC: SOLID BOLD BLACK QUANTITY SELECTOR MATRIX 🚨 */}
                    <div className="flex items-center border-2 border-black rounded-full px-4 py-1.5 gap-5 scale-90 -ml-2 bg-white font-black text-black">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-black hover:text-gray-600 transition-colors active:scale-90 px-0.5"
                      >
                        <Minus size={13} strokeWidth={3} />
                      </button>
                      
                      <span className="text-sm font-black text-black min-w-[14px] text-center italic">
                        {item.quantity}
                      </span>
                      
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-black hover:text-gray-600 transition-colors active:scale-90 px-0.5"
                      >
                        <Plus size={13} strokeWidth={3} />
                      </button>
                    </div>
                    
                    <span className="text-sm font-black text-black">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t bg-gray-50 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-wider">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-black text-lg font-black tracking-tighter">
                <span>Estimated Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/checkout');
                }}
                className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[3px] hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group shadow-xl"
              >
                Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;