'use client'
import { Button } from '../ui/button'
import { Clock, MapPin, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/useCartStore'

import burger2 from '@/public/FoodItem/image.png'
import { toast } from 'sonner'
import { FoodItem } from '@/types/mockType'
import { useState } from 'react'

type Props = {
    foodItems: FoodItem[],
    sliceNo?:number
}

const FoodItemCard = ({foodItems,sliceNo}: Props) => {
    

    const addItem = useCartStore((state) => state.addItem);

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
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
        {(sliceNo ? foodItems.slice(0, sliceNo):foodItems).map((food) => {
            const [imgSrc, setImgSrc] = useState(food.image);
            return (
          <div
            key={food.id}
            className="flex w-full gap-2 lg:gap-4 rounded-xl border-2 border-[#EBF4F1] bg-card p-2 lg:p-4 shadow-md hover:shadow-lg transition-shadow items-center"
          >
            <div className="relative w-28 h-28 lg:w-40 lg:h-40 rounded-lg overflow-hidden shrink-0">
              <Image
                src={imgSrc}
                alt={food.name}
                fill
                className="object-cover"
                onError={()=>setImgSrc(burger2.src)}
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
                    <p className="font-medium text-xs lg:text-sm">{food.review.star}</p>
                    <p className="text-xs lg:text-sm">({food.review.count})</p>
                  </div>
                  {/* {food.deliveryFree && (
                    <Badge variant="secondary" className="text-xs">
                      Free delivery
                    </Badge>
                  )} */}
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
        )})}
      </div>
  )
}

export default FoodItemCard