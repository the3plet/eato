"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { topRestaurants } from "@/data/mockData";
import burger from "@/public/FoodItem/burger.png";
import { useGlobalStore } from "@/store/useGlobalState";
import { use } from "react";
import { useRouter } from "next/navigation";

const TopRestaurants = () => {
  const {setRestaurant} = useGlobalStore()
  const router= useRouter()

  return (
    <section className="w-full mt-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#05140A]">Popular Foodspots</h2>
        {/* <span className="text-xs text-muted-foreground">
          1 / {topRestaurants.length}
        </span> */}
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className=" lg:justify-center">
          {topRestaurants.map((restaurant) => (
            <CarouselItem onClick={() => {  setRestaurant(restaurant.name); router.push('/menu'); }}
                key={restaurant.id}
                className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/2 pl-4 lg:pl-6 lg:pr-6 lg:mx-2"
            >
              <div
                className={`rounded-2xl px-3 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] `}
                style={{
                  backgroundColor:
                    restaurant.id === "r1"
                      ? "#C66E52" // Orange
                      : restaurant.id === "r2"
                      ? "#67AE6E" // Green
                      : "#06B6D4", // Cyan
                }}
              >
                <div className="flex w-full h-full gap-4">
                  <div className=" w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={burger}
                      alt={restaurant.name}
                        width={180}
                        height={180}
                        className="object-contain w-4/4 h-fit rounded-md lg:w-40 lg:h-40"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-3 w-full">
                    <div className="flex items-center gap-1 text-white/90 ">
                      <Star className="h-3 w-3 text-yellow-300" />
                        <span className="text-xs font-medium lg:text-sm">
                        {restaurant.rating}
                      </span>
                    </div>
                      <h3 className="text-white font-semibold text-md leading-tight lg:text-xl">
                      {restaurant.name}
                    </h3>
                      <p className="text-white/80 text-xs lg:text-sm">
                      {restaurant.location}
                    </p>
                      <p className="text-white/80 font-semibold text-xs lg:text-sm">
                      {restaurant.travelTime}
                    </p>
                    <Button
                      variant="secondary"
                        className=" text-xs font-medium my-1 bg-black text-white/90 hover:bg-white/50 w-fit px-3 h-fit py-1 rounded-2xl lg:px-4 lg:py-2 lg:text-sm"
                    >
                      Check Out
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TopRestaurants;
