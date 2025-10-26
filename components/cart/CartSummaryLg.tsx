"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { useRouter } from 'next/navigation'

export default function CartSummaryLg() {
  const items = useCartStore((s) => s.items)
  const router= useRouter();

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = items.length ? 10 : 0
  const total = subtotal + delivery

  return (
    <div className="hidden lg:block w-full lg:w-full p-6 lg:p-8">
      <div className="rounded-2xl border p-8 lg:p-10 bg-white shadow-md space-y-8 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <span className="text-sm text-muted-foreground">{items.length} items</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Sub-Total</span>
            <span className="text-base lg:text-lg">₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery Fee</span>
            <span className="text-base lg:text-lg">₹{delivery}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-4 border-t">
            <span className="lg:text-lg">Total</span>
            <span className="text-2xl lg:text-3xl">₹{total.toFixed(0)}</span>
          </div>
        </div>

        <div className="pt-2">
          <Input placeholder="Promo Code" className="mb-4 lg:mb-6" />
          <Button className="w-full py-4 text-lg lg:text-xl" onClick={()=> router.push('/checkout')}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  )
}
