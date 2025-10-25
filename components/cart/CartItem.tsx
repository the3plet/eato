"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

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

  const onDec = () => {
    updateQuantity(item.id, item.quantity - 1)
  }

  const onInc = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border p-3 bg-card">
      <div className="w-20 h-20 rounded-md overflow-hidden bg-slate-100 relative">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-semibold">{item.name}</h4>
            <p className="text-xs text-muted-foreground">120 EGP</p>
          </div>
          <div className="text-sm font-semibold">{item.price.toFixed(0)} EGP</div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onDec} className="w-8 h-8 rounded-full">
              <Minus className="w-4 h-4" />
            </Button>
            <div className="w-10 text-center">{item.quantity}</div>
            <Button size="sm" variant="outline" onClick={onInc} className="w-8 h-8 rounded-full">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <button className="text-xs text-muted-foreground" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
