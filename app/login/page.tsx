"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { users } from '@/data/mockData'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const login = useAuthStore((s) => s.login)
  const router = useRouter()

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      toast.error('Invalid credentials')
      return
    }
    login(found)
    toast.success(`Welcome back, ${found.username}`)
    router.push('/profile')
  }

  return (
    <div className="w-full h-[80vh]  flex flex-col justify-center items-center mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
        <div className="flex justify-center">
          <Button type="submit" className='w-full'>Sign in</Button>
        </div>
      </form>
    </div>
  )
}