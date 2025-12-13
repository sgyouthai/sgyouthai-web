"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import {
  Check,
  Link as LinkIcon,
  Share,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type LinkInfo = { href: string; name: string };
type ButtonProps = React.ComponentProps<typeof Button>;

export interface ShareButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  linkInfo: { href: string; name: string };
}

type SocialDef = {
  name: string;
  Icon: React.ComponentType<{ size?: number; round?: boolean }>;
  Button: React.ComponentType<{
    url: string;
    title?: string;
    subject?: string;
    children: React.ReactNode;
    onClick?: () => void;
  }>;
};

function safeCopy(text: string) {
  // Clipboard only works on secure contexts; provide a fallback.
  if (navigator.clipboard?.writeText)
    return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  return Promise.resolve();
}

function ShareBody({
  linkInfo,
  copied,
  onCopy,
  onMore,
  scrollRef,
  onScrollLeft,
  onScrollRight,
  showArrows,
  posthog,
}: {
  linkInfo: LinkInfo;
  copied: boolean;
  onCopy: () => void;
  onMore: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  showArrows: boolean;
  posthog: ReturnType<typeof usePostHog> | null;
}) {
  const title = `SYAI — ${linkInfo.name}`;

  const socials: SocialDef[] = [
    { name: "WhatsApp", Icon: WhatsappIcon, Button: WhatsappShareButton },
    { name: "Telegram", Icon: TelegramIcon, Button: TelegramShareButton },
    { name: "Facebook", Icon: FacebookIcon, Button: FacebookShareButton },
    { name: "X", Icon: XIcon, Button: TwitterShareButton },
    { name: "LinkedIn", Icon: LinkedinIcon, Button: LinkedinShareButton },
    { name: "Email", Icon: EmailIcon, Button: EmailShareButton },
  ];
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    // small epsilon to avoid flicker from fractional pixels
    const left = el.scrollLeft;

    setCanScrollLeft(left > 1);
    setCanScrollRight(left < max - 1);
  }, [scrollRef]);

  useEffect(() => {
    if (!showArrows) return;

    const el = scrollRef.current;
    if (!el) return;

    // run once after layout
    requestAnimationFrame(updateArrows);

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);

    // optional but nice: handles content/width changes
    const ro = new ResizeObserver(() => updateArrows());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
      ro.disconnect();
    };
  }, [showArrows, updateArrows, scrollRef]);

  return (
    <>
      <div className="inline-flex justify-center w-full px-5">
        <Link
          href={linkInfo.href}
          target="_blank"
          className="w-full flex-col bg-[rgb(243,243,241)] rounded-2xl p-6 shadow md:w-[327px] hover:scale-[1.01] hover:shadow-max-elevation-light shadow-low-elevation-light"
          style={{
            border: "1px solid gainsboro",
            transition:
              "transform 250ms ease-in-out, box-shadow 250ms ease-in-out, background-color 700ms linear",
          }}
          onClick={() => {
            posthog?.capture(`Clicked ShareButton Link: ${linkInfo.name}`);
          }}
        >
          <div className="flex flex-col items-center self-stretch justify-center gap-4">
            <div className="flex flex-col items-center self-stretch justify-center gap-2">
              <h3 className="text-center text-black text-lg font-bold text-balance leading-[120%]">
                {linkInfo.name}
              </h3>
              <p className="overflow-hidden text-black text-center text-base text-ellipsis whitespace-nowrap leading-[150%] w-[min(90%,13ch)]">
                {linkInfo.href}
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="max-w-xs md:max-w-md mx-auto flex flex-col gap-4 self-stretch py-6 overflow-hidden">
        <div className="flex items-center gap-2">
          {showArrows && (
            <Button
              variant="secondary"
              size="icon"
              onClick={onScrollLeft}
              className={cn("h-8 w-8", !canScrollLeft && "opacity-0")}
              type="button"
            >
              <ChevronLeft size={20} />
            </Button>
          )}

          {/* IMPORTANT FIX: overflow-x-auto (desktop was overflow-hidden) */}
          <div
            ref={scrollRef}
            className={cn(
              "flex items-start gap-4 w-full",
              "overflow-x-auto overscroll-x-contain",
              "snap-x snap-mandatory",
              "md:no-scrollbar"
            )}
          >
            {/* Copy */}
            <div className="snap-start flex w-[60px] flex-col items-center justify-center gap-1.5 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black">
              <Button
                size="icon"
                className="h-12 w-12 rounded-full"
                variant="secondary"
                type="button"
                onClick={onCopy}
              >
                {copied ? (
                  <Check style={{ width: 24, height: 24 }} color="green" />
                ) : (
                  <LinkIcon style={{ width: 24, height: 24 }} />
                )}
              </Button>

              <div
                className={cn(
                  "whitespace-nowrap text-center text-xs font-medium",
                  copied ? "text-[green]" : "text-white"
                )}
              >
                {copied ? "Copied" : "Copy Link"}
              </div>
            </div>

            {/* Socials */}
            {socials.map(({ name, Icon, Button: ShareBtn }) => (
              <div
                key={name}
                className="snap-start flex w-[60px] flex-col items-center justify-center gap-1.5 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              >
                <ShareBtn
                  url={linkInfo.href}
                  title={title}
                  subject={title}
                  onClick={() =>
                    posthog?.capture(`Share ${linkInfo.href} to ${name}`)
                  }
                >
                  <Icon size={48} round />
                </ShareBtn>
                <div className="whitespace-nowrap text-center text-xs font-medium">
                  {name}
                </div>
              </div>
            ))}

            {/* More (native share) */}
            <div className="snap-start flex w-[60px] flex-col items-center justify-center gap-1.5 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black">
              <Button
                size="icon"
                className="h-12 w-12 rounded-full"
                variant="secondary"
                onClick={onMore}
                type="button"
              >
                <Share style={{ width: 24, height: 24 }} />
              </Button>
              <div className="whitespace-nowrap text-center text-xs font-medium">
                More
              </div>
            </div>
          </div>

          {showArrows && (
            <Button
              variant="secondary"
              size="icon"
              onClick={onScrollRight}
              className={cn("h-8 w-8", !canScrollRight && "opacity-0")}
              type="button"
            >
              <ChevronRight size={20} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default function ShareButton({
  icon,
  linkInfo,
  ...props
}: ShareButtonProps) {
  const posthog = usePostHog();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    posthog?.capture(`Clicked ShareButton: ${linkInfo.name}`);
    e.stopPropagation();
    // keep preventDefault in case the button sits inside a Link/card
    e.preventDefault();
    setOpen(true);
  };

  const handleCopyLink = async () => {
    posthog?.capture(`Copied link: ${linkInfo.name}`);
    try {
      await safeCopy(linkInfo.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1000);
    } catch {
      // optional: toast here
    }
  };

  const handleMoreShare = () => {
    posthog?.capture(`Enter MoreShare: ${linkInfo.name}`);
    if (!navigator.share) return;

    navigator
      .share({
        title: linkInfo.name,
        text: `Check this out: SYAI's ${linkInfo.name}`,
        url: linkInfo.href,
      })
      .catch(() => {});
  };

  const scrollContainer = (direction: "left" | "right") => {
    posthog?.capture(`Scroll share row ${linkInfo.name}: ${direction}`);
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const trigger = (
    <Button {...props} onClick={handleTriggerClick} type="button">
      {icon}
    </Button>
  );

  const body = (
    <ShareBody
      linkInfo={linkInfo}
      copied={copied}
      onCopy={handleCopyLink}
      onMore={handleMoreShare}
      scrollRef={scrollRef}
      onScrollLeft={() => scrollContainer("left")}
      onScrollRight={() => scrollContainer("right")}
      showArrows={isDesktop}
      posthog={posthog}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:rounded-2xl">
          <DialogHeader className="w-full">
            <DialogTitle className="text-center pb-4">Share link</DialogTitle>
            {body}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share link</DrawerTitle>
          {body}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
