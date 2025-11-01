"use client";

import { foodItems, trendingFoodItems } from "@/data/mockData";
import FoodItemCard from "../common/FoodItemCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/useGlobalState";

const Recommended = () => {
  const router = useRouter();
  const {category}=useGlobalStore()

  const [filTrendingFoodItems, setFilTrendingFoodItems] = useState(trendingFoodItems);

console.log(category)
  useEffect(()=>{
    if(category){
      const filtered = foodItems.filter(item=>category ==='all' ? item : item?.tags?.includes(category.toLowerCase()))
      setFilTrendingFoodItems(filtered)
    }
  },[category])

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-6" id="recommended">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Trending Foods
          </h2>
          <p className="text-gray-600 mt-1">Most popular dishes right now</p>
        </div>
        <button
          className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#369570] hover:text-white  hover:bg-[#369570] rounded-xl transition-all duration-300 hover:shadow-lg"
          onClick={() => router.push("/menu")}
        >
          View All
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {filTrendingFoodItems.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-700 mb-2">No items found</p>
          <p className="text-sm text-gray-500 text-center max-w-md">
            No items found in this category. Try selecting a different category to see more options.
          </p>
        </div>
      ) : (
        <FoodItemCard foodItems={filTrendingFoodItems} sliceNo={4} />
      )}
    </section>
  );
};

export default Recommended;
