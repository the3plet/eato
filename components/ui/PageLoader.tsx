"use client"

import React from 'react'

type Props = Readonly<{
  text?: string
  size?: number
}>

export default function PageLoader({ text = 'Loading...', size = 48 }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        className="animate-spin text-gray-700"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="text-sm text-muted-foreground">{text}</div>
    </div>
  )
}
