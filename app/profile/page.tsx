"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { User, LogOut, MapPin, Mail, Package, Clock, ChevronRight, ShoppingBag } from 'lucide-react'
import { gsap } from 'gsap'

export default function Page() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()
  const [orders, setOrders] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const ordersRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('orders')
      setOrders(raw ? JSON.parse(raw) : [])
    } catch (err) {
      console.error('Failed to read orders', err)
      setOrders([])
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
      }

      if (profileRef.current) {
        gsap.fromTo(
          profileRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
        )
      }

      if (ordersRef.current) {
        const orderCards = ordersRef.current.querySelectorAll(".order-card")
        gsap.fromTo(
          orderCards,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
        )
      }
    }
  }, [isLoading, orders.length])

  const onLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-5xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-gray-200 rounded-2xl p-6 md:p-8 mb-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-2xl p-6 h-48 animate-pulse"></div>
            <div className="bg-gray-100 rounded-2xl p-6 h-64 animate-pulse"></div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-5xl mx-auto pb-24 md:pb-8">
        {/* Premium Header */}
        <div
          ref={headerRef}
          className="relative bg-linear-to-br from-[#369570] via-[#2d7a5c] to-[#234d3f] rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-xl overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {user?.username || 'My Profile'}
                </h2>
                <p className="text-white/80 text-sm md:text-base mt-0.5 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user?.email || 'Not signed in'}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={onLogout}
              className="bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Information */}
        <div ref={profileRef} className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b">
            <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Profile Information</h3>
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#369570]" />
                  <span className="text-xs text-gray-500 font-medium">Full Name</span>
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800">{user.username}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[#369570]" />
                  <span className="text-xs text-gray-500 font-medium">Email Address</span>
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800">{user.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#369570]" />
                  <span className="text-xs text-gray-500 font-medium">Default Address</span>
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800">{user.defaultAddress}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Not signed in</div>
          )}
        </div>

        {/* Order History */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b">
            <div className="w-9 h-9 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Order History</h3>
            {orders.length > 0 && (
              <span className="ml-auto text-xs bg-[#369570] text-white px-2.5 py-1 rounded-full font-medium">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </span>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h4>
              <p className="text-gray-500 mb-6">Start exploring our menu and place your first order!</p>
              <Button 
                onClick={() => router.push('/menu')}
                className="bg-[#369570] hover:bg-[#2d7a5c]"
              >
                Browse Menu
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ) : (
            <div ref={ordersRef} className="space-y-3 md:space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="order-card bg-linear-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:border-[#369570]/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-base md:text-lg font-bold text-gray-800">{o.items[0].name}</h4>
                        {o.items.length > 1 && (
                          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                            +{o.items.length - 1} more
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(o.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {o.items[0].qty} {o.items[0].qty === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl md:text-2xl font-bold text-[#369570]">₹{o.total.toFixed(0)}</p>
                      <p className="text-xs text-gray-500 mt-0.5 capitalize">{o.payment}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs md:text-sm text-gray-600">
                      Order ID: <span className="font-mono font-medium">{o.id}</span>
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                      Delivered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
