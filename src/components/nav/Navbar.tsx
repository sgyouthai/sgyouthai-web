"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Drop this component anywhere (e.g. in app/layout.tsx) to get a sticky, glassy navbar.
 * - Desktop: inline links + CTA button.
 * - Mobile: hamburger opens a Sheet with the same links + CTA.
 * - Active route gets full opacity; others are 60%.
 */
export default function SiteNavbar() {
  const pathname = usePathname();

  const links: {
    label: string;
    href: string;
    match?: (p: string) => boolean;
  }[] = [
    { label: "Home", href: "/", match: (p) => p === "/" },
    { label: "About", href: "/about", match: (p) => p.startsWith("/about") },
    {
      label: "Portfolio",
      href: "/portfolio",
      match: (p) => p.startsWith("/portfolio"),
    },
    {
      label: "Contact",
      href: "/contact",
      match: (p) => p.startsWith("/contact"),
    },
    { label: "FAQ", href: "#faq", match: () => false }, // hash links not considered active here
  ];

  return (
    <nav
      className={
        "sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl " +
        "bg-gradient-to-b from-black/0 to-black/30"
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative -ml-1 flex items-center gap-3">
          <span className="relative inline-block h-7 w-28">
            <Image
              src="/SYAI_Logo_White.png"
              alt="Logo"
              fill
              sizes="1000px"
              className="object-contain"
              priority
            />
          </span>
          <Separator
            orientation="vertical"
            className="hidden h-6 bg-white/20 md:inline-flex"
          />
        </Link>

        {/* Desktop menu */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-4 lg:gap-6">
            {links.map(({ label, href, match }) => {
              const isActive = match?.(pathname || "") ?? false;
              const isHash = href.startsWith("#");
              return (
                <li key={href}>
                  <NavLink href={href} active={isActive} hashLink={isHash}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Button
            asChild
            className="rounded-xl shadow-[0_8px_40px_0_rgba(0,85,255,0.5)]"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg text-white/90 hover:text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-b border-white/10 bg-gradient-to-b from-zinc-900/50 to-black/60 backdrop-blur-2xl"
            >
              <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-2">
                <div className="flex items-center justify-between">
                  <Link href="/" className="relative inline-block h-7 w-28">
                    <Image
                      src="/SYAI_Logo_White.png"
                      alt="Logo"
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </Link>
                </div>
                <div className="mt-4">
                  <ul className="flex flex-col gap-2">
                    {links.map(({ label, href, match }) => {
                      const isActive = match?.(pathname || "") ?? false;
                      const isHash = href.startsWith("#");
                      return (
                        <li key={href}>
                          <NavLink
                            href={href}
                            active={isActive}
                            hashLink={isHash}
                            className="block rounded-lg px-3 py-2 text-base"
                          >
                            {label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    asChild
                    className="mt-4 w-full rounded-xl shadow-[0_8px_40px_0_rgba(0,85,255,0.5)]"
                  >
                    <Link href="/contact">Get In Touch</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
  hashLink,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  hashLink?: boolean;
  className?: string;
}) {
  const base = cn(
    "text-sm font-medium text-white/60 transition-opacity hover:opacity-100",
    active && "opacity-100",
    className
  );

  if (hashLink) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}
