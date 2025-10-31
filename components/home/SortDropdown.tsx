"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ListFilter } from "lucide-react"

export type SortOption = "price-asc" | "price-desc" | "az" | "za" | null

type Props = {
  value: SortOption
  onChange: (v: SortOption) => void
}

export default function SortDropdown({ value, onChange }: Readonly<Props>) {
  const options: { label: string; value: SortOption }[] = [
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Name: A → Z", value: "az" },
    { label: "Name: Z → A", value: "za" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="default" 
          className="flex items-center gap-1.5 h-9 px-3 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white bg-transparent"
        >
          <ListFilter className="w-4 h-4" />
          <span className="text-sm">Sort</span>
          {value && (
            <span className="ml-1 bg-white text-[#369570] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8} align="center" className="w-48">
        <DropdownMenuRadioGroup value={value ?? undefined} onValueChange={(v) => onChange((v as SortOption) ?? null)}>
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.value ?? o.label} value={o.value ?? o.label} className={value === o.value ? "font-medium" : undefined}>
              {o.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem value={"__clear"} onSelect={() => onChange(null)}>
            Clear
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
