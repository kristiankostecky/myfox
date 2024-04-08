import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import type { SVGAttributes } from 'react'
import { forwardRef } from 'react'

export const Spinner = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn('size-full animate-spin-fast', className)}
        {...props}
      />
    )
  }
)

Spinner.displayName = 'Spinner'
