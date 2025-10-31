"use client";
import { Button } from "../ui/button";
import { Clock, MapPin, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

import burger2 from "@/public/FoodItem/image.png";
import { toast } from "sonner";
import { FoodItem } from "@/types/mockType";
import { useState, useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";
import { gsap } from "gsap";

type Props = {
  foodItems: FoodItem[];
  sliceNo?: number;
  page?: string;
};

// ✅ NEW: Separate component for each card
const FoodCard = ({ food, index }: { food: FoodItem, index: number }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [imgSrc, setImgSrc] = useState(food.image); // ✅ Now it's safe!
  const [loading, setLoading] = useState<boolean>(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [index]);

  const handleCardClick = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  const handleAddToCart = (food: any) => {
    addItem({
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    });
    toast.success(`${food.name} added to cart!`);
    
    // Button click animation
    if (cardRef.current) {
      const button = cardRef.current.querySelector('button');
      if (button) {
        gsap.to(button, {
          scale: 1.15,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "back.out(2)",
        });
      }
    }
  };

  return (
    <div ref={cardRef} className="md:px-40 lg:px-0">

    <div 
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      role="button"
      tabIndex={0}
      className="flex w-full  md:w-auto lg:w-full  md:flex-1 gap-2 lg:gap-4 rounded-2xl border-2 border-[#EBF4F1] bg-linear-to-br from-white to-gray-50 p-2 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)] transition-all duration-300 items-center active:scale-95 lg:hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-lg overflow-hidden shrink-0 ">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="w-5 h-5" />
          </div>
        )}
        <Image
          src={imgSrc}
          alt={food.name}
          fill
          className="object-cover"
          onError={() => setImgSrc(burger2.src)}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      <div className="flex flex-col justify-center flex-1 px-3">
        <div className="flex justify-between gap-1">
          <div className="flex flex-col justify-start">
            <h3 className="text-base lg:text-lg font-bold text-[#05140A] leading-tight">
              {food.name}
            </h3>
            <p className="text-xs lg:text-sm text-[#05140A]/80 flex items-center gap-1">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
              {food.restaurantName}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center pt-0.5 gap-1 text-muted-foreground ">
              <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" />
              <p className="font-medium text-xs lg:text-sm">
                {food.review.star}
              </p>
              <p className="text-xs lg:text-sm">({food.review.count})</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-[#05140A]/80" />
                <p className="text-xs lg:text-sm text-[#05140A]/80">
                  {food.deliveryTime}
                </p>
              </div>

              <p className="flex justify-start w-full text-xl lg:text-2xl font-semibold text-foreground">
                ₹{food.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="h-full flex items-end">
            <Button
              size="sm"
              onClick={() => handleAddToCart(food)}
              className="rounded-full text-sm lg:text-base bg-primary text-primary-foreground font-light hover:bg-primary/90 h-8 lg:h-10 flex items-center gap-1 lg:px-3"
            >
              <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
              Order
            </Button>
          </div>
        </div>
      </div>
    </div>
        </div>

  );
};

// ✅ Main component now just maps without hooks
const FoodItemCard = ({ foodItems, sliceNo, page }: Props) => {
  return (
    <div className={`flex flex-col gap-4 lg:grid  lg:gap-6 ${page === 'search' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
      {(sliceNo ? foodItems.slice(0, sliceNo) : foodItems).map((food, index) => (
        <FoodCard key={food.id} food={food} index={index} />
      ))}
    </div>
  );
};

export default FoodItemCard;