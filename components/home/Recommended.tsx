"use client";

import Image from "next/image";
import { Star, Clock, MapPin, Plus } from "lucide-react";
import { trendingFoodItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import burger2 from "@/public/FoodItem/image.png";
import FoodItemCard from "../common/FoodItemCard";
import { useRouter } from "next/navigation";

const Recommended = () => {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

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
      <FoodItemCard foodItems={trendingFoodItems} sliceNo={4}/>
    
    </section>
  );
};

export default Recommended;
