"use client"

import React from "react"
import { FoodItem } from "@/types/mockType"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGlobalStore } from "@/store/useGlobalState"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SlidersHorizontal } from "lucide-react"

type Filters = {
  minPrice?: number
  maxPrice?: number
  tags: string[]
  restaurants: string[]
}

type Props = {
  open: boolean
  onClose: () => void
  onApply: (filters: Filters) => void
  initial?: Filters
  allItems: FoodItem[]
}

export default function FilterModal({ open, onClose, onApply, initial, allItems }: Readonly<Props>) {
  const [minPrice, setMinPrice] = React.useState<number | undefined>(initial?.minPrice)
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>(initial?.maxPrice)
  const [tags, setTags] = React.useState<string[]>(initial?.tags ?? [])
  const [restaurants, setRestaurants] = React.useState<string[]>(initial?.restaurants ?? [])

  const { restaurant: newRestaurant, setRestaurant: setNewRestaurant } = useGlobalStore()

  React.useEffect(() => {
    if (!open && initial) {
      setMinPrice(initial.minPrice)
      setMaxPrice(initial.maxPrice)
      setTags(initial.tags ?? [])
      setRestaurants(initial.restaurants ?? [])
    }
  }, [open, initial])

  const allTags = Array.from(new Set(allItems.flatMap((i) => i.tags ?? [])))
  const allRestaurants = Array.from(new Set(allItems.map((i) => i.restaurantName)))

  const toggle = (arr: string[], set: (s: string[]) => void, val: string) => {
    if (arr.includes(val)) set(arr.filter((a) => a !== val))
    else set([...arr, val])
  }

  const handleReset = () => {
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setTags([])
    setRestaurants([])
    setNewRestaurant('')
    onApply({ minPrice: 0, maxPrice: Infinity, tags: [], restaurants: [] })
    onClose()
  }

  const handleApply = () => {
    onApply({ minPrice, maxPrice, tags, restaurants })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-linear-to-br from-[#369570] to-[#2d7a5c] rounded-lg flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            Filter Menu Items
          </DialogTitle>
          <DialogDescription>
            Refine your search by price, tags, and restaurants
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-5 py-4">
          {/* Price Range */}
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="min-price"
                name="min-price"
                type="number"
                placeholder="Min ₹"
                value={minPrice ?? ""}
                onChange={(e: any) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1 h-10"
              />
              <span className="text-gray-400">—</span>
              <Input
                id="max-price"
                name="max-price"
                type="number"
                placeholder="Max ₹"
                value={maxPrice ?? ""}
                onChange={(e: any) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                className="flex-1 h-10"
              />
            </div>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Food Tags
              </legend>
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant={tags.includes(t) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggle(tags, setTags, t)}
                    className={tags.includes(t) ? "bg-[#369570] hover:bg-[#2d7a5c]" : ""}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </fieldset>
          )}

          {/* Restaurants */}
          {allRestaurants.length > 0 && (
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Restaurants
              </legend>
              <div className="flex flex-wrap gap-2">
                {allRestaurants.map((r) => (
                  <Button
                    key={r}
                    type="button"
                    variant={
                      restaurants.includes(r) || newRestaurant === r
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => toggle(restaurants, setRestaurants, r)}
                    className={
                      restaurants.includes(r) || newRestaurant === r
                        ? "bg-[#369570] hover:bg-[#2d7a5c]"
                        : ""
                    }
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-initial">
            Reset All
          </Button>
          <div className="flex gap-2 flex-1 sm:flex-initial">
            <Button variant="ghost" onClick={onClose} className="flex-1 sm:flex-initial">
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="bg-[#369570] hover:bg-[#2d7a5c] flex-1 sm:flex-initial"
            >
              Apply Filters
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
