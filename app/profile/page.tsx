"use client"

import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { Item } from '@radix-ui/react-dropdown-menu'

export default function Page() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const [orders, setOrders] = React.useState<any[]>([])

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('orders')
      setOrders(raw ? JSON.parse(raw) : [])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to read orders', err)
      setOrders([])
    }
  }, [])

  const onLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <ProtectedRoute>
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Profile</h2>
          {user && <p className="text-sm text-muted-foreground">{user.email}</p>}
        </div>
        <div>
          <Button variant="ghost" onClick={onLogout}>Logout</Button>
        </div>
      </div>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-2">Basic info</h3>
        {user ? (
          <div className="space-y-1">
            <div><strong>Name:</strong> {user.username}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Default address:</strong> {user.defaultAddress}</div>
          </div>
        ) : (
          <div className="text-muted-foreground">Not signed in</div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-medium mb-2">Recent orders</h3>
        {orders.length === 0 ? (
          <div className="text-muted-foreground">No recent orders</div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="border rounded p-3">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
                  <div className="font-semibold">₹{o.total.toFixed(0)}</div>
                </div>
                <div className="text-sm text-muted-foreground">{o.items.length} items</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    </ProtectedRoute>
  )
}
