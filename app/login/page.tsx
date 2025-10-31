"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { users } from '@/data/mockData'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

export default function Page() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const login = useAuthStore((s) => s.login)
  const router = useRouter()
  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      
      tl.fromTo(titleRef.current, 
          { y: -30, opacity: 0, scale: 0.9 }, 
          { y: 0, opacity: 1, scale: 1, duration: 0.6 }
        )
        .fromTo([emailRef.current, passwordRef.current, buttonRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.5 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
    <div ref={containerRef} className="w-full h-[80vh]  flex flex-col justify-center items-center mx-auto p-4">
      <h2 ref={titleRef} className="text-2xl font-semibold mb-4">Sign in</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <Input ref={emailRef} placeholder="Email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
        <Input ref={passwordRef} placeholder="Password" type="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
        <div className="flex justify-center">
          <Button ref={buttonRef} type="submit" className='w-full'>Sign in</Button>
        </div>
      </form>
    </div>
  )
}