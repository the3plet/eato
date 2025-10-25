"use client"

import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { useCartStore } from '@/store/useCartStore'
import { useEffect, useState } from 'react'

export default function Page() {
  const items = useCartStore((s) => s.items)
  const [wHeight, setWHeight] = useState(0);
  useEffect(()=>{

    const wHeight = window.innerHeight;
    setWHeight(wHeight);
  },[])
  return (
    <div className="p-4 md:p-8   "  style={{ height: `${wHeight}px` }}>
      <h2 className="text-lg font-semibold mb-4">Your cart</h2>
      <div className="flex flex-col justify-between md:grid-cols-[1fr,auto] gap-6 ">
        <div className=" space-y-3">
          {items.length === 0 ? (
            <div className="text-muted-foreground">Your cart is empty</div>
          ) : (
            items.map((it) => <CartItem key={it.id} item={it} />)
          )}
        </div>
<div>

        <CartSummary />
</div>
      </div>
    </div>
  )
}