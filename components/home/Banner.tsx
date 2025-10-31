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
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Banner() {
  const bannerRef = useRef<HTMLElement>(null);
  
  const smallBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMBAAIE9/8AAAAASUVORK5CYII=";

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <section ref={bannerRef} className="m-4 bg-[#ebf4f1] rounded-lg overflow-hidden">
      <Carousel className="relative" plugins={[Autoplay({ delay: 2500 })]}>
        <CarouselContent className="w-full">
          {slides.map((src, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="w-full h-44 sm:h-56 md:h-64 lg:h-80 relative ">
                <Image
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-fill"
                  placeholder="blur"
                  blurDataURL={smallBase64}
                  priority={idx === 0}
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
