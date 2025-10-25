'use client'

import * as React from "react"
import Image from "next/image"
import { foodCategories } from "@/data/mockData"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

const Categories = () => {
  const [selectedId, setSelectedId] = React.useState<string | undefined>()

  return (
    <div className="w-full max-w-full px-4 rounded-full">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {foodCategories.map((category) => (
            <CarouselItem key={category.id} className="basis-auto pl-2">
              <button
                onClick={() => setSelectedId(category.id)}
                className={`flex items-center justify-center gap-2 px-2 pr-4 py-1 rounded-full whitespace-nowrap transition-colors ${
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
                  className="rounded-full object-cover w-8 h-8"
                />
                <span className="text-sm font-medium text-[#05140A">{category.name}</span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Categories
