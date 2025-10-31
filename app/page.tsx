"use client";

import { useState, useEffect } from "react";
import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import Faq from "@/components/home/Faq";
import Header from "@/components/home/Header";
import Recommended from "@/components/home/Recommended";
import Searchbar from "@/components/home/Searchbar";
import TopResturants from "@/components/home/TopResturants";
import { SkeletonCard, SkeletonCategory, SkeletonRestaurant } from "@/components/ui/SkeletonCard";

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    // Sequential timeline with delays
    const timeouts = [
      setTimeout(() => setShowBanner(true), 200),
      setTimeout(() => setShowCategories(true), 600),
      setTimeout(() => setShowRestaurants(true), 1000),
      setTimeout(() => setShowRecommended(true), 1400)
    ];

    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] font-sans dark:bg-black">
      <Header />
      
      {/* Hero Section with Search */}
      <div className="relative bg-linear-to-br from-[#369570] via-[#2d7a5c] to-[#234d3f]  md:py-2">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-40 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <Searchbar />
        </div>
      </div>
      
      {/* Banner Section */}
      {showBanner ? <Banner /> : (
        <div className="px-4 py-4">
          <div className="w-full h-48 lg:h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      )}
      
      {/* Categories Section */}
      {showCategories ? <Categories /> : (
        <div className="px-4 py-4 flex gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCategory key={i} />
          ))}
        </div>
      )}
      
      {/* Top Restaurants Section */}
      {showRestaurants ? <TopResturants /> : (
        <div className="px-4 py-4">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[250px]">
                <SkeletonRestaurant />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommended Section */}
      {showRecommended ? <Recommended /> : (
        <div className="px-4 py-4">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      )}
      
      <Faq />
    </div>
  );
}
