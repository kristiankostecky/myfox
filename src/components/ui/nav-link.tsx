'use client'

import { useMatchPath } from '@/lib/hooks/use-match-path'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, href, ...props }, ref) => {
  const isMatch = useMatchPath(
    typeof href === 'string' ? href : (href.pathname ?? null)
  )

  return (
    <Link
      href={href}
      ref={ref}
      className={cn(
        {
          'font-bold underline': isMatch,
        },
        className
      )}
      {...props}
    />
  )
})

NavLink.displayName = 'Button'

export { NavLink }
