"use client";

import { useCartStore } from "@/store/useCartStore";
import CartItem from "@/components/cart/CartItem";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ShoppingBag, CreditCard, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const items = useCartStore((s) => s.items);
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      }

      if (itemsRef.current) {
        const itemElements = itemsRef.current.querySelectorAll(".checkout-item");
        gsap.fromTo(
          itemElements,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
        );
      }

      if (summaryRef.current) {
        gsap.fromTo(
          summaryRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power3.out" }
        );
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="bg-gray-200 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-300 rounded-2xl"></div>
              <div>
                <div className="h-8 md:h-10 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-6 md:gap-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-4 animate-pulse h-32"></div>
              ))}
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 h-96 animate-pulse"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto pb-24 md:pb-8">
        {/* Premium Header */}
        <div
          ref={headerRef}
          className="relative bg-linear-to-br from-[#369570] via-[#2d7a5c] to-[#234d3f] rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-xl overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full"></div>

          <div className="relative flex items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/cart")}
              className="bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 p-0 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </Button>

            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Checkout
                </h2>
                <p className="text-white/80 text-sm md:text-base mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"} • Review and place order
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,420px] gap-6 md:gap-8 lg:items-start">
          {/* Left Column - Items */}
          <div ref={itemsRef} className="space-y-4 md:space-y-5">
            {/* Order Items Section */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                <ShoppingBag className="w-5 h-5 text-[#369570]" />
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Order Items
                </h3>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 mb-4">No items in cart</p>
                  <Button onClick={() => router.push("/menu")} className="bg-[#369570] hover:bg-[#2d7a5c]">
                    Browse Menu
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((it) => (
                    <div key={it.id} className="checkout-item">
                      <CartItem item={it} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Checkout Summary */}
          <div ref={summaryRef} className="lg:sticky lg:top-6">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
