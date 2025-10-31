"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { useRouter } from 'next/navigation'
import { Tag, Truck, ShoppingCart, ArrowRight, CheckCircle2, Gift, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'

export default function CartSummaryLg() {
  const items = useCartStore((s) => s.items)
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = subtotal >= 199 ? 0 : 10
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal + delivery - discount

  useEffect(() => {
    if (summaryRef.current) {
      gsap.fromTo(summaryRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 }
      )
    }
  }, [])

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true)
      // Celebration animation
      if (summaryRef.current) {
        gsap.to(summaryRef.current, {
          scale: 1.02,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        })
      }
    }
  }

  return (
    <div ref={summaryRef} className="hidden lg:block w-full sticky top-4">
      <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 shadow-xl p-5 space-y-4 hover:shadow-2xl transition-shadow duration-300">
        {/* Header with Icon */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-800">Order Summary</h3>
              <p className="text-xs text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-[#369570]" />
        </div>

        {/* Promo Code Section */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#369570]" />
            Have a promo code?
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Enter code (try SAVE10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="pl-9 h-10 border-2 border-gray-200 focus:border-[#369570] rounded-xl text-sm font-medium"
              />
            </div>
            <Button 
              onClick={applyPromo}
              disabled={promoApplied || !promoCode}
              className={`h-10 px-4 rounded-xl font-bold text-sm shadow-md ${
                promoApplied 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-[#369570] hover:bg-[#2d7a5c]'
              }`}
            >
              {promoApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Applied
                </>
              ) : (
                'Apply'
              )}
            </Button>
          </div>
          {promoApplied && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-xs font-semibold text-green-700">
                You saved ₹{discount.toFixed(0)} with this code!
              </p>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 bg-linear-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-base font-bold text-gray-800">₹{subtotal.toFixed(0)}</span>
          </div>
          
          {promoApplied && (
            <div className="flex justify-between items-center bg-green-50 -mx-4 px-4 py-1.5">
              <span className="text-sm text-green-700 font-medium">Discount (10%)</span>
              <span className="text-base font-bold text-green-600">-₹{discount.toFixed(0)}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Delivery Fee</span>
            </div>
            <span className={`text-base font-bold ${delivery === 0 ? 'text-green-600' : 'text-gray-800'}`}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>

          {delivery > 0 && subtotal < 199 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-2">
              <p className="text-xs font-semibold text-orange-700 text-center">
                🎉 Add ₹{(199 - subtotal).toFixed(0)} more for FREE delivery!
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
            <span className="text-base font-bold text-gray-800">Total Amount</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#369570]">₹{total.toFixed(0)}</span>
              <p className="text-[10px] text-gray-500 mt-0.5">Inclusive of all taxes</p>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <Button 
          className="w-full h-11 bg-linear-to-r from-[#369570] to-[#2d7a5c] hover:from-[#2d7a5c] hover:to-[#369570] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group" 
          onClick={() => router.push('/checkout')}
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg mb-0.5">🔒</div>
            <p className="text-[10px] text-gray-600 font-medium">Secure</p>
          </div>
          <div className="text-center">
            <div className="text-lg mb-0.5">⚡</div>
            <p className="text-[10px] text-gray-600 font-medium">Fast</p>
          </div>
          <div className="text-center">
            <div className="text-lg mb-0.5">✅</div>
            <p className="text-[10px] text-gray-600 font-medium">Quality</p>
          </div>
        </div>
      </div>
    </div>
  )
}
