"use client";

import * as React from "react";
import Image from "next/image";
import { foodCategories } from "@/data/mockData";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useGlobalStore } from "@/store/useGlobalState";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { gsap } from "gsap";

const Categories = () => {
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const { setCategory } = useGlobalStore();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.category-item');
      gsap.fromTo(items,
        { scale: 0.8, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-full px-4 rounded-full">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 lg:flex lg:justify-center md:flex md:justify-center">
          {foodCategories.map((category) => (
            <CarouselItem key={category.id} className="basis-auto pl-2 category-item">
              <button
                onClick={() => {
                  setSelectedId(category.id);
                  setCategory(category.name);
                  const target =document.getElementById("recommended");
                  target?.scrollIntoView({ behavior: "smooth", block: "nearest"});
                }}
                className={`flex items-center justify-center gap-2 px-2 pr-4 py-1 rounded-full whitespace-nowrap transition-colors lg:gap-2 lg:px-2 lg:pr-6 lg:py-1 lg:hover:bg-[#329570] lg:hover:text-white ${
                  selectedId === category.id
                    ? "bg-[#329570] text-white"
                    : "bg-[#EBF4F1] text-foreground hover:bg-muted/80"
                }`}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name} 
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8 lg:w-12 lg:h-12"
                />
                <span
                  className={`text-sm font-medium text-[#05140A] lg:text-base ${
                    selectedId === category.id
                      ? "text-white"
                      : "text-foreground"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            </CarouselItem>
          ))}
          <Badge
            className={`px-4 ml-2 lg:text-base ${
              selectedId === "clear"
                ? "bg-slate-800"
                : "bg-[#EBF4F1] text-black"
            }`}
            onClick={() => {
              setSelectedId("clear");
              setCategory("all");
            }}
          >
            Clear <X className="lg:w-8 lg:h-8"/>
          </Badge>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Categories;
