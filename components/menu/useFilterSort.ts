"use client"

import React from "react"
import { FoodItem } from "@/types/mockType"
import type { SortOption } from "./SortModal"

export type Filters = {
  minPrice?: number
  maxPrice?: number
  tags: string[]
  restaurants: string[]
}

export default function useFilterSort(allItems: FoodItem[]) {
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [sortOpen, setSortOpen] = React.useState(false)

  const [filters, setFilters] = React.useState<Filters>({ tags: [], restaurants: [] })
  const [sort, setSort] = React.useState<SortOption>(null)

  const applyFilters = React.useCallback((f: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...(f as Filters) }))
  }, [])

  const filteredItems = React.useMemo(() => {
    let items = [...allItems]

    if (filters.minPrice != null) items = items.filter((i) => i.price >= (filters.minPrice ?? 0))
    if (filters.maxPrice != null) items = items.filter((i) => i.price <= (filters.maxPrice ?? Infinity))
    if (filters.tags?.length) items = items.filter((i) => (i.tags ?? []).some((t) => filters.tags.includes(t)))
    if (filters.restaurants?.length) items = items.filter((i) => filters.restaurants.includes(i.restaurantName))

    if (sort === "price-asc") items.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") items.sort((a, b) => b.price - a.price)
    else if (sort === "az") items.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === "za") items.sort((a, b) => b.name.localeCompare(a.name))

    return items
  }, [allItems, filters, sort])

  return {
    filterOpen,
    setFilterOpen,
    sortOpen,
    setSortOpen,
    filters,
    setFilters,
    sort,
    setSort,
    applyFilters,
    filteredItems,
    allItems,
  }
}
