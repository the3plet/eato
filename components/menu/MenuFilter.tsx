import React from "react";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";
import useFilterSort, { Filters } from "../../hooks/useFilterSort";
import FilterModal from "./FilterModal";
import SortDropdown from "@/components/home/SortDropdown";

type HookShape = ReturnType<typeof useFilterSort>

type Props = {
  hook: HookShape
}

const MenuFilter = ({ hook }: Props) => {
  const { filterOpen, setFilterOpen, filters, sort, setSort, applyFilters, allItems } = hook

  return (
    <div>
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f: Filters) => applyFilters(f)}
        allItems={allItems}
        initial={filters}
      />

      <div className="flex gap-2 pt-2 items-center">
        <Badge
          onClick={() => setFilterOpen(true)}
          variant={"outline"}
          className="text-sm cursor-pointer active:bg-[#379570]/70 active:text-white transition-colors flex items-center gap-1"
        >
          <SlidersHorizontal /> Filter
        </Badge>

        <SortDropdown value={sort} onChange={(v) => setSort(v)} />
      </div>
    </div>
  )
}

export default MenuFilter;
