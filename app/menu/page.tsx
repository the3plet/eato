'use client'
import FoodItemCard from "@/components/common/FoodItemCard";
import { Badge } from "@/components/ui/badge";
import { foodItems } from "@/data/mockData";
import { ListFilter, SlidersHorizontal } from "lucide-react";
import React from "react";
import useFilterSort from "@/components/menu/useFilterSort";
import MenuFilter from "@/components/menu/MenuFilter";

type Props = {};

const Page = (props: Props) => {
  const hook = useFilterSort(foodItems)

  return (
    <section className="w-full mt-8 space-y-4 px-4">
      <div className="flex flex-col ">
        <h2 className="flex text-xl font-semibold text-[#05140A] ">FoodItem Menu</h2>
        <MenuFilter hook={hook} />
      </div>

      <FoodItemCard foodItems={hook.filteredItems} sliceNo={0} />
    </section>
  )
}

export default Page;
