"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import FoodItemCard from "../common/FoodItemCard";
import useSearch from "@/hooks/useSearch";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";

type Props = {};

const Searchbar = (props: Props) => {
  const [input, setInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>(input);
  const filteredData = useSearch(debouncedInput);
  const [model, setModel] = useState<boolean>(false);

useEffect(() => {
  // If input is empty, update immediately so results/overlay close without delay
  if (!input || input.trim() === "") {
    setDebouncedInput("");
    return;
  }

  const handler = setTimeout(() => setDebouncedInput(input), 1000);
  return () => clearTimeout(handler);
}, [input]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setModel(true);
    } else {
      setModel(false);
    }
  }, [filteredData]);

  return (
    <div className="relative mx-4 py-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
        placeholder="Search your food"
        className="pl-10 w-full h-10 bg-[#f4f6f5] border-none rounded-md text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
      />
      <Dialog open={model} onOpenChange={setModel}>
        <DialogContent className="p-4 my-2 border-0 bg-slate-100 z-50 absolute">
          <DialogTitle className="pb-1">Search Results</DialogTitle>
          {filteredData && (
            <FoodItemCard foodItems={filteredData} sliceNo={2} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Searchbar;
