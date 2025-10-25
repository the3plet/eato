import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

type Props = {};

const Searchbar = (props: Props) => {
  return (
    <div className="relative mx-4 py-2">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search your food"
        className="pl-10 w-full h-10 bg-[#f4f6f5] border-none rounded-md text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
      />
    </div>
  );
};

export default Searchbar;
