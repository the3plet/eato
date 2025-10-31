"use client";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import CartSummaryLg from "@/components/cart/CartSummaryLg";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import {
  BadgePercent,
  ChevronLeft,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function Page() {
  const items = useCartStore((s) => s.items);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const cartItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && headerRef.current) {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && emptyStateRef.current && items.length === 0) {
      // Empty state animation
      const elements = emptyStateRef.current.querySelectorAll(".empty-item");
      gsap.fromTo(
        elements,
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.4)",
          delay: 0.3,
        }
      );
    }
  }, [isLoading, items.length]);

  useEffect(() => {
    if (!isLoading && cartItemsRef.current && items.length > 0) {
      // Cart items animation
      const itemElements = cartItemsRef.current.querySelectorAll(".cart-item");
      gsap.fromTo(
        itemElements,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, [isLoading, items.length]);

  if (isLoading) {
    return (
      <div className="p-0 md:p-6 lg:p-8 lg:max-w-7xl lg:mx-auto lg:pt-8 w-full min-h-screen">
        {/* Header Skeleton */}
        <div className="bg-gray-200 rounded-b-3xl lg:rounded-2xl p-4 py-6 lg:py-8 mb-4 lg:mb-8 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1 mx-4 flex flex-col items-center gap-2">
              <div className="h-8 md:h-10 bg-gray-300 rounded w-32 md:w-40"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="w-20 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="px-4 md:px-0 pb-32 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,440px] gap-6 lg:gap-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl p-4 animate-pulse"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden lg:block bg-gray-100 rounded-2xl p-6 h-96 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 md:p-6 lg:p-8 lg:max-w-7xl lg:mx-auto lg:pt-8 w-full min-h-screen">
      {/* Improved Header */}
      <div
        ref={headerRef}
        className="relative bg-linear-to-r from-[#2d7a5c] via-[#369570] to-[#3fa57d] rounded-b-3xl lg:rounded-2xl p-4 py-6 lg:py-8 mb-4 lg:mb-8 shadow-lg"
      >
        {/* Decorative Background Elements */}
        <div className="absolute -top-10 right-16  w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-10 w-20 h-20 bg-white/5 rounded-full translate-y-1/2"></div>

        <div className="relative flex justify-between items-center">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="bg-white/10 hover:bg-white/20 border-none text-white backdrop-blur-sm rounded-full w-10 h-10 p-0 transition-all duration-300 hover:scale-110 md:w-12 md:h-12 lg:flex"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </Button>

          {/* Title Section */}
          <div className="flex flex-col items-center flex-1 mx-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              My Cart
            </h2>
            {items.length > 0 && (
              <p className="text-white/80 text-sm md:text-base mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            )}
          </div>

          {/* Discount Button */}
          <Button
            variant="ghost"
            className="bg-red-500/10 hover:bg-white/20 border-none text-white backdrop-blur-sm rounded-full px-3 py-2 h-auto transition-all duration-300 hover:scale-105 md:px-4 md:py-2.5 "
          >
            <BadgePercent
              className="w-5 h-5 md:w-6 md:h-6  "
              strokeWidth={2}
            />
            <span className="hidden md:inline text-sm font-semibold">
              Offers
            </span>
          </Button>
        </div>

        {/* Progress Bar (if items exist) */}
        {items.length > 0 && (
          <div className="mt-4 lg:mt-6">
            <div className="flex justify-between text-white/90 text-xs md:text-sm mb-2">
              <span className="font-medium">Free delivery at ₹199</span>
              <span className="font-semibold">
                ₹
                {items
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(0)}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500 shadow-lg"
                style={{
                  width: `${Math.min(
                    (items.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    ) /
                      199) *
                      100,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="px-4 md:px-0 pb-32 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,440px] gap-6 lg:gap-8 lg:items-start">
          {/* Left Column - Cart Items */}
          <div ref={cartItemsRef} className="space-y-3 lg:space-y-4 w-full">
            {items.length === 0 ? (
              <div
                ref={emptyStateRef}
                className="flex flex-col items-center justify-center py-16 lg:py-24 px-4"
              >
                <div className="relative mb-6 empty-item">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <ShoppingBag
                      className="w-16 h-16 lg:w-20 lg:h-20 text-gray-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛒</span>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 empty-item">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 text-center mb-8 max-w-md lg:text-lg empty-item">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Start exploring our delicious menu!
                </p>

                <Button
                  onClick={() => router.push("/menu")}
                  size="lg"
                  className="bg-[#369570] hover:bg-[#2d7a5c] text-white px-8 py-6 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 empty-item"
                >
                  Browse Menu
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="cart-item">
                  <CartItem item={it} />
                </div>
              ))
            )}
          </div>

          {/* Right Column - Summary (Desktop only, sticky) */}
          {items.length > 0 && (
            <div className="hidden lg:block lg:sticky lg:top-8">
              <CartSummaryLg />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Summary - Fixed at bottom */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <CartSummary />
        </div>
      )}
    </div>
  );
}
