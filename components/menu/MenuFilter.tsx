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

  // Calculate active filter count
  const activeFilterCount = React.useMemo(() => {
    let count = 0
    if (filters.minPrice !== undefined && filters.minPrice !== null) count++
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) count++
    if (filters.tags && filters.tags.length > 0) count += filters.tags.length
    if (filters.restaurants && filters.restaurants.length > 0) count += filters.restaurants.length
    return count
  }, [filters])

  return (
    <div>
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f: Filters) => applyFilters(f)}
        allItems={allItems}
        initial={filters}
      />

      <div className="flex gap-2 items-center">
        <Badge
          onClick={() => setFilterOpen(true)}
          variant={"outline"}
          className="relative text-sm cursor-pointer active:bg-[#379570]/70 active:text-white transition-colors flex items-center gap-1.5 h-9 px-3 rounded-lg border-white/30 text-white hover:bg-white/10 hover:border-white/50"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-white text-[#369570] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Badge>

        <SortDropdown value={sort} onChange={(v) => setSort(v)} />
      </div>
    </div>
  )
}

export default MenuFilter;
