"use client";

import Image from "next/image";
import { Star, Clock, MapPin, Plus } from "lucide-react";
import { foodItems, trendingFoodItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import burger2 from "@/public/FoodItem/image.png";
import FoodItemCard from "../common/FoodItemCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/useGlobalState";

const Recommended = () => {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const {category}=useGlobalStore()

  const [filTrendingFoodItems, setFilTrendingFoodItems] = useState(trendingFoodItems);

  const handleAddToCart = (food: any) => {
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    });
    toast.success(`${food.name} added to cart!`);
  };
console.log(category)
  useEffect(()=>{
    if(category){
      const filtered = foodItems.filter(item=>category ==='all' ? item : item?.tags?.includes(category.toLowerCase()))
      setFilTrendingFoodItems(filtered)
    }
  },[category])

  return (
    <section className="w-full mt-8 space-y-4 px-4">
      <div className="flex justify-between items-center">
        <h2 className="flex text-xl font-semibold text-[#05140A] ">
          Trending Foods
        </h2>
        <button
          className="flex  text-sm text-muted-foreground underline cursor-pointer hover:font-semibold"
          onClick={() => router.push("/menu")}
        >
          View All
        </button>
      </div>
      {filTrendingFoodItems.length === 0 ? (
        <div className="w-full flex justify-center items-center pb-5">
          <p className="px-4 py-2 text-sm text-center">No items found in this category, try a different category.</p>
        </div>
      ) : (
        <FoodItemCard foodItems={filTrendingFoodItems} sliceNo={4} />
      )}

    </section>
  );
};

export default Recommended;
