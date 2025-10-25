import React from "react";
import { Badge } from "@/components/ui/badge";
import { ListFilter, SlidersHorizontal } from "lucide-react";
import useFilterSort, { Filters } from "./useFilterSort";
import FilterModal from "./FilterModal";
import SortModal from "./SortModal";

type HookShape = ReturnType<typeof useFilterSort>

type Props = {
  hook: HookShape
}

const MenuFilter = ({ hook }: Props) => {
  const { filterOpen, setFilterOpen, sortOpen, setSortOpen, filters, sort, setSort, applyFilters, allItems } = hook

  return (
    <div>
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f: Filters) => applyFilters(f)}
        allItems={allItems}
        initial={filters}
      />
      <SortModal
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        value={sort}
        onChange={(v) => { setSort(v); setSortOpen(false); }}
      />

      <div className="flex gap-2 pt-2">
        <Badge
          onClick={() => setFilterOpen(true)}
          variant={"outline"}
          className="text-sm cursor-pointer active:bg-[#379570]/70 active:text-white transition-colors flex items-center gap-1"
        >
          <SlidersHorizontal /> Filter
        </Badge>
        <Badge
          onClick={() => setSortOpen(true)}
          variant={"outline"}
          className="text-sm cursor-pointer active:bg-[#379570]/70 active:text-white transition-colors flex items-center gap-1"
        >
          <ListFilter /> Sort
        </Badge>
      </div>
    </div>
  )
}

export default MenuFilter;
