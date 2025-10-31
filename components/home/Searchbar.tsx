"use client";
import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import FoodItemCard from "../common/FoodItemCard";
import useSearch from "@/hooks/useSearch";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Spinner } from "../ui/spinner";

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
    if (input.length > 0) {
      setModel(true);
    } else {
      setModel(false);
    }
  }, [debouncedInput]);

  return (
    <div className="relative mx-4 md:mx-6 lg:mx-auto lg:max-w-3xl py-3">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#369570] h-5 w-5 transition-colors" />
        <Input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          placeholder="Search your favorite dishes, restaurants..."
          className="pl-12 pr-12 w-full h-12 md:h-14 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl md:rounded-2xl text-gray-700 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#369570]/50 focus-visible:border-[#369570] shadow-xl transition-all"
        />
        {input && filteredData.length <= 1 && (
          <Spinner className="absolute right-4 top-1/2 -translate-y-1/2" />
        )}
        {input && filteredData.length >= 1 && (
          <button
            onClick={() => setInput("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <Dialog open={model} onOpenChange={setModel}>
        <DialogContent className=" md:max-w-auto max-h-[70vh] p-0 my-2 bg-white z-50 w-auto absolute top-16 rounded-2xl focus:outline-none overflow-hidden border-2 border-gray-100 shadow-2xl">
          <DialogTitle className="sr-only">Search Results</DialogTitle>
          <div className="p-4 md:p-6 overflow-y-auto w-full max-h-[70vh]">
            {filteredData.length > 0 ? (
              <>
                <div className="flex w-full items-center justify-between mb-4 pb-3 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Search Results
                  </h3>
                  <span className="text-sm text-gray-500">
                    {filteredData.length} {filteredData.length === 1 ? "item" : "items"} found
                  </span>
                </div>
                <FoodItemCard foodItems={filteredData} sliceNo={6} page="search" />
              </>
            ) : (
              <div className="flex flex-col min-w-xs lg:min-w-xl items-center justify-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-base text-gray-600 font-medium">No results found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Searchbar;
