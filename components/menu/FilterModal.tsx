"use client"

import React from "react"
import { FoodItem } from "@/types/mockType"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGlobalStore } from "@/store/useGlobalState"

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

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100 flex items-start p-4 md:items-center justify-center">
      <button type="button" aria-label="Close filter" className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full md:w-3/5 bg-white rounded-t-lg md:rounded-lg p-4 md:p-6 max-h-[60vh] overflow-auto">
        <h3 className="text-lg font-semibold mb-3">Filter items</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="min-price" className="block text-xs text-muted-foreground">Price range</label>
            <div className="flex items-center gap-2 mt-2">
              <Input id="min-price" name="min-price" type="number" placeholder="Min" value={minPrice ?? ''} onChange={(e:any)=>setMinPrice(e.target.value?Number(e.target.value):undefined)} className="w-1/2" />
              <Input id="max-price" name="max-price" type="number" placeholder="Max" value={maxPrice ?? ''} onChange={(e:any)=>setMaxPrice(e.target.value?Number(e.target.value):undefined)} className="w-1/2" />
            </div>
          </div>

          <fieldset>
            <legend className="block text-xs text-muted-foreground">Tags</legend>
            <div className="flex flex-wrap gap-2 mt-2">
              {allTags.map((t) => (
                <Button
                  key={t}
                  variant={tags.includes(t) ? "default" : "outline"}
                  size="sm"
                  asChild={false}
                  onClick={() => toggle(tags, setTags, t)}
                  className="px-3"
                >
                  {t}
                </Button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="block text-xs text-muted-foreground">Restaurants</legend>
            <div className="flex flex-wrap gap-2 mt-2">
              {allRestaurants.map((r) => (
                <Button
                  key={r}
                  variant={(restaurants.includes(r) || newRestaurant === r) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggle(restaurants, setRestaurants, r)}
                  className="px-3"
                >
                  {r}
                </Button>
              ))}
            </div>
          </fieldset>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => { setMinPrice(undefined); setMaxPrice(undefined); setTags([]); setRestaurants([]); setNewRestaurant('');}}>
              Reset
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={() => { onApply({ minPrice, maxPrice, tags, restaurants }); onClose(); }}>Apply</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
