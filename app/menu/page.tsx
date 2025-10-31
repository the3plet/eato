'use client'
import FoodItemCard from "@/components/common/FoodItemCard";
import { foodItems } from "@/data/mockData";
import { Utensils, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useFilterSort from "@/hooks/useFilterSort";
import MenuFilter from "@/components/menu/MenuFilter";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";

type Props = {};

const Page = (props: Props) => {
  const hook = useFilterSort(foodItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && headerRef.current && contentRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
      
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
      )
    }
  }, [isLoading])

  const filteredBySearch = hook.filteredItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-gray-200 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 mb-5 md:mb-6 animate-pulse">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-xl"></div>
            <div className="flex-1">
              <div className="h-6 md:h-7 bg-gray-300 rounded w-32 md:w-40 mb-1"></div>
              <div className="h-3 md:h-4 bg-gray-300 rounded w-28 md:w-36"></div>
            </div>
          </div>
          <div className="h-10 md:h-11 bg-gray-300 rounded-lg md:rounded-xl mb-3"></div>
          <div className="flex gap-2">
            <div className="h-9 w-20 bg-gray-300 rounded-lg"></div>
            <div className="h-9 w-20 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-4 animate-pulse h-64">
              <div className="w-full h-32 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 max-w-7xl mx-auto">
      {/* Compact Premium Header */}
      <div 
        ref={headerRef}
        className="relative bg-linear-to-br from-[#369570] via-[#2d7a5c] to-[#234d3f] rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 mb-5 md:mb-6 shadow-xl overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>
        
        <div className="relative">
          {/* Compact Title Section */}
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Our Menu
                </h2>
                <p className="text-white/80 text-xs md:text-sm">
                  Discover delicious dishes
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - More Compact */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 md:pl-12 h-10 md:h-11 bg-white/95 backdrop-blur-sm border-0 rounded-lg md:rounded-xl text-sm md:text-base shadow-lg focus:ring-2 focus:ring-white/50"
            />
          </div>

          {/* Filters */}
          <MenuFilter hook={hook} />
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef}>
        {filteredBySearch.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 md:w-20 md:h-20 text-gray-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No items found
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-600">
                <span className="font-semibold text-gray-800">{filteredBySearch.length}</span> {filteredBySearch.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
            <FoodItemCard foodItems={filteredBySearch} sliceNo={0} />
          </>
        )}
      </div>
    </section>
  )
}

export default Page;
