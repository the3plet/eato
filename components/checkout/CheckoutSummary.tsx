"use client"

import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'

export default function CheckoutSummary() {
  const [payment, setPayment] = React.useState<string>('cod')
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>()

 useEffect(() => {
    const measure = () => setTriggerWidth(triggerRef.current?.offsetWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  // controlled address fields so we can persist them into the order record
  const [fullName, setFullName] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [city, setCity] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = items.length ? 10 : 0
  const total = subtotal + delivery
  const paymentLabels: Record<string, string> = {
    cod: 'Cash on delivery',
    card: 'Card',
    upi: 'UPI',
  }
  const paymentLabel = paymentLabels[payment] ?? 'Select payment'

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const order = {
      id: `ord_${Date.now()}`,
      items: items.map((i) => ({ id: i.id, name: i.name, qty: i.quantity, price: i.price })),
      subtotal,
      delivery,
      total,
      payment,
      address: {
        fullName,
        street,
        city,
        phone,
      },
      createdAt: new Date().toISOString(),
    }

    // persist to localStorage orders list
    try {
      const raw = localStorage.getItem('orders')
      const arr = raw ? JSON.parse(raw) : []
      arr.unshift(order)
      localStorage.setItem('orders', JSON.stringify(arr))
    } catch (err) {
      // best-effort persistence — log error for debugging
      // eslint-disable-next-line no-console
      console.error('Failed to persist order', err)
    }

    // clear cart and notify
    clearCart()
    toast.success('Order placed — thanks!')
  }

  return (
    <aside className="w-full md:w-[380px] space-y-4 p-4 lg:w-full lg:space-y-6 lg:p-6">
      <div className="rounded-lg border p-4 lg:p-6 bg-white space-y-3 lg:space-y-4">
  <div className="text-sm text-muted-foreground lg:text-base">Delivery Address</div>
  <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName((e.target as HTMLInputElement).value)} />
  <Input placeholder="Street, building, apt" value={street} onChange={(e) => setStreet((e.target as HTMLInputElement).value)} />
  <Input placeholder="City" value={city} onChange={(e) => setCity((e.target as HTMLInputElement).value)} />
  <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
      </div>

      <div className="rounded-lg border p-4 lg:p-6 bg-white space-y-3">
        <div className="text-sm text-muted-foreground lg:text-base">Payment</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button ref={triggerRef} variant="outline" className="w-full justify-between">
              {paymentLabel}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent style={triggerWidth ? { width: `${triggerWidth}px` } : undefined}>
            <DropdownMenuRadioGroup value={payment} onValueChange={(v) => setPayment(v)}>
              <DropdownMenuRadioItem value="cod">Cash on delivery</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="card">Card</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="upi">UPI</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border p-4 lg:p-6 bg-white space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground lg:text-base">
          <span>Sub-Total</span>
          <span>₹{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground lg:text-base">
          <span>Delivery Fee</span>
          <span>₹{delivery}</span>
        </div>
        <div className="flex justify-between text-base font-semibold mt-2 lg:text-lg">
          <span>Total</span>
          <span className="lg:text-2xl">₹{total.toFixed(0)}</span>
        </div>
      </div>

      <Button onClick={handlePlaceOrder} className="w-full lg:py-3 lg:text-lg">
        Place Order
      </Button>
    </aside>
  )
}
