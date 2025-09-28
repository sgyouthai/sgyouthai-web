"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type MatchFn = (p: string) => boolean;

type LinkDef = {
  label: string;
  href: string;
  match?: MatchFn;
  children?: { label: string; href: string; match?: MatchFn }[];
};

export default function SiteNavbar() {
  const pathname = usePathname() || "/";

  const links: LinkDef[] = [
    { label: "Home", href: "/", match: (p) => p === "/" },
    { label: "About", href: "/about", match: (p) => p.startsWith("/about") },
    {
      label: "Portfolio",
      href: "/portfolio",
      match: (p) => p.startsWith("/portfolio"),
      children: [
        {
          label: "Client Work",
          href: "/portfolio/clients",
          match: (p) => p.startsWith("/portfolio/clients"),
        },
        {
          label: "Open Source",
          href: "/portfolio/oss",
          match: (p) => p.startsWith("/portfolio/oss"),
        },
        {
          label: "Case Studies",
          href: "/portfolio/cases",
          match: (p) => p.startsWith("/portfolio/cases"),
        },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      match: (p) => p.startsWith("/contact"),
    },
    { label: "FAQ", href: "#faq", match: () => false }, // hash example
  ];

  const ctaBtn = [
    { label: "Join Telegram", href: "/test" },
    { label: "Join Discord", href: "/2test" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-gradient-to-b from-black/0 to-black/30">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative -ml-1 flex items-center gap-3">
          <span className="relative inline-block h-16 w-16">
            <Image
              src="/SYAI_Logo_White.png"
              alt="Logo"
              fill
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
        <div className="hidden w-full items-center gap-6 md:flex">
          <ul className="mr-auto flex items-center gap-4 lg:gap-6">
            {links.map((item) => {
              const anyChildActive =
                item.children?.some((c) => c.match?.(pathname) ?? false) ??
                false;
              const isActive =
                item.match?.(pathname) || anyChildActive || false;

              // Hash link stays a simple anchor
              if (item.href.startsWith("#") && !item.children?.length) {
                return (
                  <li key={item.href}>
                    <NavLink href={item.href} active={isActive} hashLink>
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              // If the item has children, render dropdown
              if (item.children?.length) {
                return (
                  <li key={item.href} className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={cn(
                          "inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-opacity hover:opacity-100 focus:outline-none",
                          isActive && "opacity-100"
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={8}
                        className="min-w-48 bg-zinc-900/90 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/70"
                      >
                        {/* Optional: include parent as first link */}
                        <DropdownMenuItem asChild>
                          <Link href={item.href} className="w-full">
                            View all
                          </Link>
                        </DropdownMenuItem>
                        <div className="my-1 h-px bg-white/10" />
                        {item.children.map((c) => (
                          <DropdownMenuItem key={c.href} asChild>
                            <Link href={c.href} className="w-full">
                              {c.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              }

              // Regular link
              return (
                <li key={item.href}>
                  <NavLink href={item.href} active={isActive}>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {ctaBtn.map((e) => (
            <Button
              key={`DesktopCTA${e.href}`}
              asChild
              className="rounded-xl shadow-[0_8px_40px_0_rgba(0,85,255,0.5)]"
            >
              <Link href={e.href}>{e.label}</Link>
            </Button>
          ))}
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
              <SheetTitle className="sr-only" />
              <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-6">
                <div className="flex items-center justify-center">
                  <Link href="/" className="relative inline-block h-16 w-16">
                    <Image
                      src="/SYAI_Logo_White.png"
                      alt="Logo"
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </Link>
                </div>

                <div className="mt-4 space-y-2">
                  <ul className="flex flex-col gap-2">
                    {/* Mobile: show parents without children as links; with children as accordion */}
                    {links.map((item) => {
                      const anyChildActive =
                        item.children?.some(
                          (c) => c.match?.(pathname) ?? false
                        ) ?? false;
                      const isActive =
                        item.match?.(pathname) || anyChildActive || false;

                      // Plain hash link
                      if (item.href.startsWith("#") && !item.children?.length) {
                        return (
                          <li key={item.href}>
                            <NavLink
                              href={item.href}
                              active={isActive}
                              hashLink
                              className="block rounded-lg px-3 py-2 text-base"
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      }

                      // No children -> simple link
                      if (!item.children?.length) {
                        return (
                          <li key={item.href}>
                            <NavLink
                              href={item.href}
                              active={isActive}
                              className="block rounded-lg px-3 py-2 text-base"
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      }

                      // With children -> accordion
                      return (
                        <li key={item.href}>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="item">
                              <AccordionTrigger
                                className={cn(
                                  "rounded-lg px-3 py-2 text-base text-left",
                                  isActive && "opacity-100",
                                  !isActive && "text-white/60"
                                )}
                              >
                                {item.label}
                              </AccordionTrigger>
                              <AccordionContent className="pl-3">
                                <div className="flex flex-col">
                                  {/* Optional: parent link */}
                                  <Link
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white"
                                  >
                                    View all
                                  </Link>
                                  <div className="my-1 h-px bg-white/10" />
                                  {item.children.map((c) => (
                                    <Link
                                      key={c.href}
                                      href={c.href}
                                      className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white"
                                    >
                                      {c.label}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-2 flex flex-col items-center gap-2">
                    {ctaBtn.map((e) => (
                      <Button
                        key={`MobileCTA${e.href}`}
                        asChild
                        className="rounded-xl shadow-[0_8px_40px_0_rgba(0,85,255,0.5)]"
                      >
                        <Link href={e.href}>{e.label}</Link>
                      </Button>
                    ))}
                  </div>
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
