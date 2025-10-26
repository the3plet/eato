"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { useRouter } from 'next/navigation'

export default function CartSummary() {
  const items = useCartStore((s) => s.items)
  const router= useRouter();

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = items.length ? 10 : 0
  const total = subtotal + delivery

  return (
    <>
    {/* mobile / default summary (kept for small screens) */}
    <div className="w-full md:w-[380px] space-y-4 p-4 pb-20 lg:hidden">
      {/* <div className="flex items-center gap-2">
        <Input placeholder="Promo Code" className="flex-1" />
        <Button>Apply</Button>
      </div> */}

      <div className="rounded-lg border p-4 bg-white space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Sub-Total</span>
          <span>₹{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Delivery Fee</span>
          <span>₹{delivery}</span>
        </div>
        <div className="flex justify-between text-base font-semibold mt-2">
          <span>Total-Cost</span>
          <span>₹{total.toFixed(0)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={()=> router.push('/checkout')}>Checkout</Button>
    </div>

    {/* large screen summary - separate component for bigger layout */}
    
    </>
  )
}
