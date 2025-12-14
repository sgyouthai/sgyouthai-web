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

type MatchFn = (pathname: string, hash: string) => boolean;

type LinkDef = {
  label: string;
  href: string;
  match?: MatchFn;
  children?: { label: string; href: string; match?: MatchFn }[];
};

export default function SiteNavbar() {
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState("");

  // Track hash so active states can work (since usePathname() doesn't include it)
  useEffect(() => {
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const lockHideUntil = useRef(0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);

  const holdNav = (ms = 1200) => {
    setHidden(false);
    const until = performance.now() + ms;
    lockHideUntil.current = Math.max(lockHideUntil.current, until);
    lastY.current = window.scrollY;
  };

  useEffect(() => {
    setMounted(true);

    lastY.current = window.scrollY;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        // ✅ while locked, keep lastY updated so delta won't "spike" later
        if (performance.now() < lockHideUntil.current) {
          lastY.current = y;
          setHidden(false);
          ticking.current = false;
          return;
        }

        const delta = y - lastY.current;
        const THRESHOLD = 20;

        if (Math.abs(delta) > THRESHOLD) {
          setHidden(delta > 0 && y > 64);
          lastY.current = y;
        }

        ticking.current = false;
      });
    };

    // If hash changes (including clicking /#something), keep nav visible briefly
    const onHashChange = () => holdNav(2000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange, false);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const links: LinkDef[] = [
    { label: "Home", href: "/", match: (p) => p === "/" },

    {
      label: "About",
      href: "/#about",
      match: (p, h) => p === "/" && h === "#about",
    },

    {
      label: "Programs",
      href: "/programs",
      match: (p) => p.startsWith("/programs"),
      children: [
        {
          label: "AI Monthly Meetups",
          href: "/programs#AIMM",
          match: (p, h) => p === "/programs" && h.toLowerCase() === "#aimm",
        },
        {
          label: "SYAI Inspire",
          href: "/programs#Inspire",
          match: (p, h) => p === "/programs" && h.toLowerCase() === "#inspire",
        },
        {
          label: "SYAI Labs",
          href: "/programs#Labs",
          match: (p, h) => p === "/programs" && h.toLowerCase() === "#labs",
        },
      ],
    },

    {
      label: "Team",
      href: "/#team",
      match: (p, h) => p === "/" && h === "#team",
    },
    {
      label: "Partners",
      href: "/#partners",
      match: (p, h) => p === "/" && h === "#partners",
    },
    {
      label: "Highlights",
      href: "/#gallery",
      match: (p, h) => p === "/" && h === "#gallery",
    },
    // { label: "FAQ", href: "/#faq", match: (p, h) => p === "/" && h === "#faq" },
  ];

  const ctaBtn = [
    { label: "Join Telegram", href: "https://t.me/sgyouthai" },
    { label: "Join Discord", href: "https://discord.gg/TacK5vbeDc" },
  ];

  // Helper: any link containing # should "hold" the navbar open
  const navHoldForHref = (href: string) =>
    href.includes("#") ? () => holdNav(2000) : undefined;

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
                item.children?.some(
                  (c) => c.match?.(pathname, hash) ?? false
                ) ?? false;

              const isActive =
                (item.match?.(pathname, hash) ?? false) || anyChildActive;

              // Dropdown
              if (item.children?.length) {
                return (
                  <li key={item.href} className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={cn(
                          "inline-flex items-center gap-1 text-[16px] font-normal text-white/60 transition-opacity hover:opacity-100 focus:outline-none",
                          isActive && "opacity-100"
                        )}
                        onClick={() => holdNav(1200)} // keep nav visible when opening dropdown
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        sideOffset={8}
                        className="min-w-48 bg-zinc-900/90 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/70"
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href={item.href}
                            className="w-full text-[16px] font-normal"
                            onClick={() => holdNav(1200)}
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
                              onClick={() => holdNav(1200)}
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

              // Regular link (including "/#about")
              return (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    active={isActive}
                    className="text-[16px] font-normal"
                    onHashNavigate={navHoldForHref(item.href)}
                    currentPathname={pathname}
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
              <Link href={e.href} target="_blank" rel="noreferrer">
                {e.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="ml-auto lg:hidden">
          <Sheet
            open={mobileOpen}
            onOpenChange={(v) => {
              setMobileOpen(v);
              if (v) holdNav(1200);
            }}
          >
            <SheetTrigger asChild>
              <Button
                ref={mobileTriggerRef}
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
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                mobileTriggerRef.current?.focus({ preventScroll: true });
              }}
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
                    {links.map((item) => {
                      const anyChildActive =
                        item.children?.some(
                          (c) => c.match?.(pathname, hash) ?? false
                        ) ?? false;

                      const isActive =
                        (item.match?.(pathname, hash) ?? false) ||
                        anyChildActive;

                      // No children -> simple link
                      if (!item.children?.length) {
                        return (
                          <li key={item.href}>
                            <NavLink
                              href={item.href}
                              active={isActive}
                              className="block rounded-lg px-3 py-2 text-base"
                              onHashNavigate={() => {
                                // if it's an anchor, keep navbar visible; also close the sheet
                                if (item.href.includes("#")) holdNav(1200);
                                setMobileOpen(false);
                              }}
                              currentPathname={pathname}
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
                                onClick={() => holdNav(900)}
                              >
                                {item.label}
                              </AccordionTrigger>

                              <AccordionContent className="pl-3">
                                <div className="flex flex-col">
                                  <Link
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white"
                                    onClick={() => {
                                      holdNav(1200);
                                      setMobileOpen(false);
                                    }}
                                  >
                                    View all
                                  </Link>

                                  <div className="my-1 h-px bg-white/10" />

                                  {item.children.map((c) => (
                                    <Link
                                      key={c.href}
                                      href={c.href}
                                      className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white"
                                      onClick={() => {
                                        holdNav(1200);
                                        setMobileOpen(false);
                                      }}
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
                        <Link href={e.href} target="_blank" rel="noreferrer">
                          {e.label}
                        </Link>
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
  className,
  onHashNavigate,
  currentPathname,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onHashNavigate?: () => void;
  currentPathname: string;
}) {
  const base = cn(
    "text-sm font-medium text-white/60 transition-opacity hover:opacity-100",
    active && "opacity-100",
    className
  );

  const isHash = href.includes("#");

  return (
    <Link
      href={href}
      className={base}
      // ✅ important: prevent Next from doing its own jump
      scroll={!isHash}
      onClick={(e) => {
        onHashNavigate?.();

        if (!isHash) return;

        // Parse href like "/#about" or "/programs#AIMM"
        const [rawPath, rawHash] = href.split("#");
        const targetPath = rawPath || currentPathname;
        const targetHash = rawHash ? `#${rawHash}` : "";

        // If it's the same page, Next uses pushState (no native hashchange),
        // so we do it ourselves and fire an event that HashScroller listens to.
        if (targetPath === currentPathname) {
          e.preventDefault();
          history.pushState(null, "", `${targetPath}${targetHash}`);
          window.dispatchEvent(new Event("hashchange"));
        }
      }}
    >
      {children}
    </Link>
  );
}
