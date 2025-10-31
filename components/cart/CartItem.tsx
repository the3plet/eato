"use client"

import Image from 'next/image'
import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { gsap } from 'gsap'

type Props = {
  item: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }
}

export default function CartItem({ item }: Readonly<Props>) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const itemRef = useRef<HTMLDivElement>(null)

  const onDec = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
      // Pulse animation on decrement
      if (itemRef.current) {
        gsap.to(itemRef.current, {
          scale: 0.98,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        })
      }
    }
  }

  const onInc = () => {
    updateQuantity(item.id, item.quantity + 1)
    // Pulse animation on increment
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.02,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
    }
  }

  const handleRemove = () => {
    // Remove animation
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        x: -100,
        opacity: 0,
        height: 0,
        marginBottom: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => removeItem(item.id)
      })
    } else {
      removeItem(item.id)
    }
  }

  return (
    <div 
      ref={itemRef}
      className="flex items-center gap-3 lg:gap-4 rounded-xl lg:rounded-2xl border-2 border-gray-100 p-3 lg:p-4 bg-white hover:shadow-lg transition-all duration-300 hover:border-[#369570]/20"
    >
      <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-lg lg:rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm lg:text-base font-semibold text-gray-800 truncate">{item.name}</h4>
            <p className="text-xs lg:text-sm text-gray-500 mt-0.5">₹{item.price.toFixed(0)} each</p>
          </div>
          <div className="text-base lg:text-lg font-bold text-[#369570]">₹{(item.price * item.quantity).toFixed(0)}</div>
        </div>

        <div className="mt-3 lg:mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-3 bg-gray-50 rounded-full p-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onDec} 
              className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-white hover:bg-[#369570] hover:text-white transition-colors shadow-sm"
            >
              <Minus className="w-3 h-3 lg:w-4 lg:h-4" />
            </Button>
            <div className="w-8 lg:w-10 text-center font-semibold text-sm lg:text-base">{item.quantity}</div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onInc} 
              className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-white hover:bg-[#369570] hover:text-white transition-colors shadow-sm"
            >
              <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
            </Button>
          </div>

          <button 
            className="text-xs lg:text-sm text-red-500 hover:text-red-600 font-medium transition-colors hover:underline" 
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
