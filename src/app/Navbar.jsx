'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'TV Shows', href: '/tv-shows', current: false },
  { name: 'Movies', href: '#', current: false },
  { name: 'New & Popular', href: '#', current: false },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 bg-bg-color z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/next.svg"
                alt="Next.js Logo"
                width={50}
                height={50}
                priority
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={` hover:text-slate-50 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${pathname === item.href ? 'text-neutral-50 underline underline-offset-[6px]' : 'text-neutral-400'}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
