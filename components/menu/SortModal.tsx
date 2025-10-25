"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export type SortOption = "price-asc" | "price-desc" | "az" | "za" | null

type Props = {
  open: boolean
  onClose: () => void
  value: SortOption
  onChange: (v: SortOption) => void
}

export default function SortModal({ open, onClose, value, onChange }: Readonly<Props>) {
  if (!open) return null

  const options: { label: string; value: SortOption }[] = [
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Name: A → Z", value: "az" },
    { label: "Name: Z → A", value: "za" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <button type="button" aria-label="Close sort" className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full md:w-1/3 bg-white rounded-t-lg md:rounded-lg p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-3">Sort</h3>
        <div className="flex flex-col gap-2">
          {options.map((o) => (
            <Button
              key={o.value ?? o.label}
              variant={value === o.value ? "default" : "outline"}
              size="default"
              onClick={() => onChange(o.value)}
              className="justify-start"
            >
              {o.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
