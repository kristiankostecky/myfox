import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserInfo } from '@/components/ui/user-info'
import { CUSTOMER_ID } from '@/config/constants'
import { type Route, routes } from '@/config/routes'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'

export function Navbar({
  links,
}: {
  links: Array<{ href: Route; label: string }>
}) {
  return (
    <header className="sticky top-0 z-40 flex h-16 min-h-16 items-center gap-4 border-b bg-background">
      <div className="container px-2 md:px-4">
        <nav className="flex items-center justify-between lg:grid lg:grid-cols-3 ">
          <Logo className="justify-self-start" />
          <span className="justify-self-center text-lg font-semibold">
            REZERVAČNÍ SYSTÉM
          </span>
          <div className="hidden items-center gap-4 justify-self-end lg:flex">
            {links.map((link) => (
              <Link
                className="whitespace-nowrap"
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Moje rezervace</DropdownMenuItem>
                  <DropdownMenuItem>Osobní údaje</DropdownMenuItem>
                  <DropdownMenuItem>Ohlásit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <AlignJustify size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <UserInfo id={CUSTOMER_ID} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={routes.reservations}>Moje rezervace</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={routes.profile}>Osobní údaje</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
