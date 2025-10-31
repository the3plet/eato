"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { useRouter } from 'next/navigation'
import { Tag, Truck, ShoppingCart, ArrowRight, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react'

export default function CartSummary() {
  const items = useCartStore((s) => s.items)
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = subtotal >= 199 ? 0 : 10
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + delivery - discount

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true)
    }
  }

  return (
    <div className="w-full md:w-[420px] lg:hidden">
      <div className="bg-white rounded-t-3xl shadow-2xl">
        {/* Collapsible Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-5 pt-4 pb-3 flex items-center justify-between border-b-2 border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#369570] rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-gray-800">Order Summary</h3>
              <p className="text-xs text-gray-500">{items.length} items • ₹{total.toFixed(0)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </button>

        {/* Expandable Content */}
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-5 pb-6">
            {/* Promo Code Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Enter promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="pl-10 h-11 border-2 border-gray-200 focus:border-[#369570] rounded-xl"
                  />
                </div>
                <Button 
                  onClick={applyPromo}
                  disabled={promoApplied || !promoCode}
                  className={`h-11 px-4 rounded-xl font-semibold ${
                    promoApplied 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-[#369570] hover:bg-[#2d7a5c]'
                  }`}
                >
                  {promoApplied ? <CheckCircle2 className="w-4 h-4" /> : 'Apply'}
                </Button>
              </div>
              {promoApplied && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Promo code applied successfully!
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4 bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">₹{subtotal.toFixed(0)}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount (10%)</span>
                  <span className="font-semibold text-green-600">-₹{discount.toFixed(0)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Delivery</span>
                </div>
                <span className={`font-semibold ${delivery === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </span>
              </div>

              {delivery > 0 && subtotal < 199 && (
                <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                  Add ₹{(199 - subtotal).toFixed(0)} more for free delivery!
                </p>
              )}

              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-base font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-[#369570]">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button - Always Visible */}
        <div className="px-5 pb-24 md:pb-6">
          <Button 
            className="w-full h-12 bg-linear-to-r from-[#369570] to-[#2d7a5c] hover:from-[#2d7a5c] hover:to-[#369570] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" 
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
