"use client";
import { foodItems } from "@/data/mockData";
import { FoodItem } from "@/types/mockType";
import { useEffect, useState } from "react";

function useSearch(input: string) {
  const [results, setResults] = useState<FoodItem[]>([]);

  useEffect(() => {
    if (!input) {
      setResults([]);
      return;
    }

    const filtered = foodItems.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );

    setResults(filtered);
  }, [input]);

  return results;
}

export default useSearch;
