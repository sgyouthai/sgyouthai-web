"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const lockHideUntil = useRef(0);

  const holdNav = (ms = 800) => {
    setHidden(false);
    lockHideUntil.current = performance.now() + ms;
  };

  useEffect(() => {
    setMounted(true);

    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        if (performance.now() < lockHideUntil.current) {
          ticking.current = false;
          return;
        }

        const y = window.scrollY;
        const delta = y - lastY.current;
        const THRESHOLD = 6;

        if (Math.abs(delta) > THRESHOLD) {
          setHidden(delta > 0 && y > 64); // keep visible near top
          lastY.current = y;
        }
        ticking.current = false;
      });
    };

    const onHashChange = () => {
      holdNav(900);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange, false);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const links: LinkDef[] = [
    { label: "Home", href: "/", match: () => false },
    { label: "About", href: "#about", match: () => false },
    {
      label: "Programs",
      href: "/programs",
      match: (p) => p.startsWith("/programs"),
      children: [
        {
          label: "AI Monthly Meetups",
          href: "/programs/clients",
          match: (p) => p.startsWith("/programs/clients"),
        },
        {
          label: "SYAI Inspire",
          href: "/programs/inspire",
          match: (p) => p.startsWith("/programs/inspire"),
        },
        {
          label: "SYAI Labs",
          href: "/programs/cases",
          match: (p) => p.startsWith("/programs/cases"),
        },
      ],
    },
    {
      label: "Team",
      href: "#team",
      match: () => false,
    },
    {
      label: "Partners",
      href: "/partners",
      match: (p) => p.startsWith("/partners"),
    },
    {
      label: "Highlights",
      href: "#gallery",
      match: () => false,
    },
    { label: "FAQ", href: "#faq", match: () => false }, // hash example
  ];

  const ctaBtn = [
    { label: "Join Telegram", href: "/test" },
    { label: "Join Discord", href: "/2test" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-gradient-to-b from-black/0 to-black/30",
        mounted
          ? "transition-transform duration-300 will-change-transform"
          : "",
        mounted && hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="mx-auto flex h-26 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
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
        </Link>
        <Separator
          orientation="vertical"
          className="h-10! mx-3 hidden lg:block"
          style={{
            background:
              "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        {/* Desktop menu */}
        <div className="hidden w-full items-center gap-6 lg:flex">
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
                    <NavLink
                      href={item.href}
                      active={isActive}
                      hashLink
                      className="text-[16px] font-normal"
                      onHashNavigate={() => holdNav(900)}
                    >
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
                          "inline-flex items-center gap-1 text-[16px] font-normal text-white/60 transition-opacity hover:opacity-100 focus:outline-none",
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
                          <Link
                            href={item.href}
                            className="w-full text-[16px] font-normal"
                          >
                            View all
                          </Link>
                        </DropdownMenuItem>
                        <div className="my-1 h-px bg-white/10" />
                        {item.children.map((c) => (
                          <DropdownMenuItem key={c.href} asChild>
                            <Link
                              href={c.href}
                              className="w-full text-[16px] font-normal"
                            >
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
                  <NavLink
                    href={item.href}
                    active={isActive}
                    className="text-[16px] font-normal"
                  >
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
              className="rounded-md bg-blue-600 px-3.5 py-5.5 text-[16px] text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Link href={e.href}>{e.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto lg:hidden">
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
                              onHashNavigate={() => holdNav(900)}
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

                  <div className="mt-6 lg:mt-2 flex flex-col gap-x-2 gap-y-4">
                    {ctaBtn.map((e) => (
                      <Button
                        key={`MobileCTA${e.href}`}
                        asChild
                        className="rounded-md bg-blue-600 px-3.5 py-5.5 text-[16px] text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
  onHashNavigate,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  hashLink?: boolean;
  className?: string;
  onHashNavigate?: () => void;
}) {
  const base = cn(
    "text-sm font-medium text-white/60 transition-opacity hover:opacity-100",
    active && "opacity-100",
    className
  );
  const Comp: "a" | typeof Link = hashLink ? "a" : Link;

  return (
    <Comp
      href={href}
      className={base}
      {...(hashLink && {
        onClick: () => {
          onHashNavigate?.();
        },
      })}
    >
      {children}
    </Comp>
  );
}
