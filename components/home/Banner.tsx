"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { slides } from "@/data/mockData";
import Autoplay from "embla-carousel-autoplay";

export default function Banner() {
  const smallBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMBAAIE9/8AAAAASUVORK5CYII=";

  return (
    <section className="m-4 bg-[#ebf4f1] rounded-lg overflow-hidden">
      <Carousel className="relative" plugins={[Autoplay({ delay: 2500 })]}>
        <CarouselContent className="w-full">
          {slides.map((src, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="w-full h-44 sm:h-56 md:h-64 lg:h-72 relative">
                <Image
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={smallBase64}
                  priority={idx === 0} // first slide top-priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:block" />
        <CarouselNext className="hidden sm:block" />
      </Carousel>
    </section>
  );
}
