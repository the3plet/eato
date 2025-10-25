"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import { cn } from "@/lib/utils"

export type SortOption = "price-asc" | "price-desc" | "az" | "za" | null

type Props = {
  value: SortOption
  onChange: (v: SortOption) => void
  className?: string
}

export default function SortHoverCard({ value, onChange, className }: Readonly<Props>) {
  const [open, setOpen] = React.useState(false)

  const options: { label: string; value: SortOption }[] = [
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Name: A → Z", value: "az" },
    { label: "Name: Z → A", value: "za" },
  ]

  return (
    <div className={cn("relative inline-block", className)}>
      <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-1 px-3 py-0.5 rounded-3xl border bg-background text-sm"
      >
        <ListFilter size={12}/>
        Sort
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Sort options"
          className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg p-2 z-50"
        >
          <div className="flex flex-col">
            {options.map((o) => (
              <Button
                key={o.value ?? o.label}
                variant={value === o.value ? "default" : "outline"}
                size="default"
                onClick={() => { onChange(o.value); setOpen(false) }}
                className="justify-start mb-1"
              >
                {o.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
