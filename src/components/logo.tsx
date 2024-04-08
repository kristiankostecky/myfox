import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={routes.home}
      className={cn('flex items-center gap-2 text-lg font-semibold', className)}
    >
      <Image src="/logo.png" alt="MyFox logo" width={80} height={25} />
    </Link>
  )
}
