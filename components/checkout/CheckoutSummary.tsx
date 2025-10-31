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
import { MapPin, CreditCard, Wallet, Banknote, Truck, CheckCircle2, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

  const [fullName, setFullName] = React.useState('')
  const [street, setStreet] = React.useState('')
  const [city, setCity] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const delivery = subtotal >= 199 ? 0 : 10
  const total = subtotal + delivery

  const paymentIcons: Record<string, React.ReactNode> = {
    cod: <Banknote className="w-4 h-4" />,
    card: <CreditCard className="w-4 h-4" />,
    upi: <Wallet className="w-4 h-4" />,
  }

  const paymentLabels: Record<string, string> = {
    cod: 'Cash on delivery',
    card: 'Card',
    upi: 'UPI',
  }

  const paymentLabel = paymentLabels[payment] ?? 'Select payment'
  const paymentIcon = paymentIcons[payment]
  const router = useRouter()

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    if (!fullName || !street || !city || !phone) {
      toast.error('Please fill in all delivery details')
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

    try {
      const raw = localStorage.getItem('orders')
      const arr = raw ? JSON.parse(raw) : []
      arr.unshift(order)
      localStorage.setItem('orders', JSON.stringify(arr))
    } catch (err) {
      console.error('Failed to persist order', err)
    }

    clearCart()
    toast.success('Order placed successfully! 🎉')
    router.push('/profile')
  }

  return (
    <div className="w-full space-y-4 md:space-y-5">
      {/* Delivery Address Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b">
          <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">Delivery Address</h3>
        </div>
        
        <div className="space-y-3">
          <Input 
            placeholder="Full name *" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)}
            className="h-11 md:h-12 border-2 border-gray-200 focus:border-[#369570] rounded-xl"
          />
          <Input 
            placeholder="Street, building, apartment *" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)}
            className="h-11 md:h-12 border-2 border-gray-200 focus:border-[#369570] rounded-xl"
          />
          <Input 
            placeholder="City *" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
            className="h-11 md:h-12 border-2 border-gray-200 focus:border-[#369570] rounded-xl"
          />
          <Input 
            placeholder="Phone number *" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 md:h-12 border-2 border-gray-200 focus:border-[#369570] rounded-xl"
          />
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b">
          <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">Payment Method</h3>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              ref={triggerRef} 
              variant="outline" 
              className="w-full h-12 justify-between border-2 border-gray-200 hover:border-[#369570] rounded-xl text-base"
            >
              <span className="flex items-center gap-2">
                {paymentIcon}
                {paymentLabel}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            style={triggerWidth ? { width: `${triggerWidth}px` } : undefined}
            className="rounded-xl"
          >
            <DropdownMenuRadioGroup value={payment} onValueChange={(v) => setPayment(v)}>
              <DropdownMenuRadioItem value="cod" className="cursor-pointer">
                <Banknote className="w-4 h-4 mr-2" />
                Cash on delivery
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="card" className="cursor-pointer">
                <CreditCard className="w-4 h-4 mr-2" />
                Card
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="upi" className="cursor-pointer">
                <Wallet className="w-4 h-4 mr-2" />
                UPI
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Order Summary Card */}
      <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 shadow-xl p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-200">
          <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-800">Order Summary</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm md:text-base">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-800">₹{subtotal.toFixed(0)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Delivery Fee</span>
            </div>
            <span className={`font-semibold ${delivery === 0 ? 'text-green-600' : 'text-gray-800'}`}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>

          {delivery > 0 && subtotal < 199 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-2.5">
              <p className="text-xs text-orange-700 font-medium text-center">
                🎉 Add ₹{(199 - subtotal).toFixed(0)} more for FREE delivery!
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
            <span className="text-base md:text-lg font-bold text-gray-800">Total Amount</span>
            <div className="text-right">
              <span className="text-2xl md:text-3xl font-bold text-[#369570]">₹{total.toFixed(0)}</span>
              <p className="text-[10px] text-gray-500">Inclusive of all taxes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <Button 
        onClick={handlePlaceOrder} 
        className="w-full h-12 md:h-14 bg-linear-to-r from-[#369570] to-[#2d7a5c] hover:from-[#2d7a5c] hover:to-[#369570] text-white font-bold text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
      >
        <CheckCircle2 className="w-5 h-5 mr-2" />
        Place Order
      </Button>

      
    </div>
  )
}
