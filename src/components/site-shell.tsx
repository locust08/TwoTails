"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { HeaderHeightSync } from "@/components/header-height-sync";
import { setAuthenticated, useAuthState } from "@/lib/auth-client";
import { footerColumns, navItems, productUrl, siteAssets, socialLinks } from "@/lib/site-data";

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

const whatsappHref = "https://wa.me/60183814392";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SiteLink({
  children,
  className,
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">) {
  if (isExternalHref(href)) {
    return (
      <a
        className={className}
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} {...props}>
      {children}
    </Link>
  );
}

function ActionChrome({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className: string;
  href?: string;
  onClick?: () => void;
}) {
  if (href) {
    return (
      <SiteLink className={className} href={href} onClick={onClick}>
        {children}
      </SiteLink>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function PrimaryButton({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <ActionChrome
      className={joinClasses(
        "inline-flex items-center justify-center rounded-full bg-black px-6 py-[10px] text-[14px] font-bold text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5",
        className,
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </ActionChrome>
  );
}

export function SecondaryButton({
  children,
  className,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <ActionChrome
      className={joinClasses(
        "inline-flex items-center justify-center rounded-full border border-[rgba(214,224,231,0.92)] bg-white px-6 py-[10px] text-[14px] font-bold text-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5",
        className,
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </ActionChrome>
  );
}

export function ProfileAvatarButton({ href = "/" }: { href?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Profile"
        className="inline-flex size-12 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(230,244,248,0.82))] shadow-[0px_8px_18px_rgba(15,23,42,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <img
          alt="Profile"
          className="h-full w-full object-cover object-center"
          src={siteAssets.thankYouHero}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+10px)] z-[160] min-w-[152px] rounded-[16px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(236,247,250,0.92))] p-2 shadow-[0px_18px_30px_rgba(15,23,42,0.16)] backdrop-blur-[16px]">
          <SiteLink
            className="block rounded-[10px] px-3 py-2 text-[13px] font-semibold text-[#1f2937] transition-colors duration-200 hover:bg-white/70"
            href={href}
            onClick={() => setOpen(false)}
          >
            View Home
          </SiteLink>
          <button
            className="mt-1 block w-full rounded-[10px] px-3 py-2 text-left text-[13px] font-semibold text-[#b42318] transition-colors duration-200 hover:bg-white/70"
            onClick={() => {
              setAuthenticated(false);
              setOpen(false);
              window.location.href = "/";
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <a
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[220] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0px_16px_30px_rgba(37,211,102,0.32)] transition-transform duration-200 hover:-translate-y-1 md:bottom-6 md:right-6 md:size-[60px]"
      href={whatsappHref}
      rel="noreferrer"
      target="_blank"
    >
      <span className="absolute inset-[3px] rounded-full border border-white/22" />
      <MessageCircle className="relative size-7" strokeWidth={2.25} />
    </a>
  );
}

export function CompactNavMenu({
  actionHref,
  actionLabel,
  activeLabel,
}: {
  actionHref?: string;
  actionLabel?: string;
  activeLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);

    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="relative xl:hidden" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open navigation"
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(235,246,249,0.62))] shadow-[0px_8px_18px_rgba(15,23,42,0.12)] backdrop-blur-[18px] transition-transform duration-200 hover:-translate-y-0.5"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <X className="size-[18px] text-[#1f2937]" strokeWidth={2.4} />
        ) : (
          <Menu className="size-[18px] text-[#1f2937]" strokeWidth={2.4} />
        )}
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+12px)] z-[170] w-[min(22rem,calc(100vw-1.5rem))] rounded-[24px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(236,247,250,0.92))] p-3 shadow-[0px_18px_30px_rgba(15,23,42,0.16)] backdrop-blur-[18px]">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <SiteLink
                key={item.label}
                aria-current={activeLabel === item.label ? "page" : undefined}
                className={joinClasses(
                  "rounded-[16px] px-4 py-3 text-[14px] font-semibold leading-5 text-[#1f2937] transition-colors duration-200 hover:bg-white/70",
                  activeLabel === item.label
                    ? "bg-white text-[#111827] shadow-[0px_6px_14px_rgba(15,23,42,0.08)]"
                    : "",
                )}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </SiteLink>
            ))}
          </div>

          {actionHref && actionLabel ? (
            <div className="mt-3 border-t border-[rgba(148,163,184,0.16)] pt-3">
              <SecondaryButton
                className="w-full"
                href={actionHref}
                onClick={() => setOpen(false)}
              >
                {actionLabel}
              </SecondaryButton>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({ activeLabel }: { activeLabel: string }) {
  const authenticated = useAuthState();

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] bg-transparent px-3 pt-2 md:px-4 md:pt-2"
      data-site-header
    >
      <HeaderHeightSync />
      <div className="site-shell-inner-wide">
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3">
          <Link
            aria-label="Go to homepage"
            className="relative z-10 inline-flex shrink-0"
            href="/"
          >
            <img
              alt="Signature Market"
              className="h-auto w-[160px] md:w-[194px]"
              decoding="async"
              src={siteAssets.logo}
            />
          </Link>

          <nav className="hidden rounded-full border border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(255,255,255,0.18))] p-[5px] shadow-[0px_10px_24px_rgba(15,23,42,0.1),inset_0px_1px_0px_rgba(255,255,255,0.52)] backdrop-blur-[16px] xl:block">
            <div className="flex items-center gap-1 rounded-full p-1">
              {navItems.map((item) => (
                <SiteLink
                  key={item.label}
                  aria-current={activeLabel === item.label ? "page" : undefined}
                  className={joinClasses(
                    "rounded-full px-4 py-[9px] text-[14px] font-semibold leading-5 text-[#262626] transition-all duration-200 hover:bg-[rgba(255,255,255,0.3)] hover:text-[#0f172a]",
                    activeLabel === item.label
                      ? "bg-[rgba(255,255,255,0.58)] text-[#111827] shadow-[0px_2px_8px_rgba(15,23,42,0.1)]"
                      : "",
                  )}
                  href={item.href}
                >
                  {item.label}
                </SiteLink>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 xl:gap-[31px]">
            <PrimaryButton className="min-w-[96px] px-5 text-[13px] sm:min-w-[112px] sm:px-6 sm:text-[14px]" href={productUrl}>
              Buy Now
            </PrimaryButton>
            {authenticated ? (
              <ProfileAvatarButton />
            ) : (
              <div className="hidden xl:block">
                <SecondaryButton href="/register">Register/Login</SecondaryButton>
              </div>
            )}
            <CompactNavMenu
              actionHref={authenticated ? undefined : "/register"}
              actionLabel={authenticated ? undefined : "Register/Login"}
              activeLabel={activeLabel}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-30 border-t border-[rgba(134,230,250,0.1)] bg-white px-4 pb-8 pt-[49px] md:px-0">
      <div className="site-shell-inner">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-4 md:grid-rows-[192px]">
          <div className="flex max-w-[276px] flex-col gap-[23px]">
            <img alt="Signature Market" className="h-auto w-[175px]" src={siteAssets.logo} />
            <p className="text-[14px] leading-[22.75px] text-[#0f172a]/60">
              At Signature Market, we believe healthy living should be simple,
              affordable, and accessible. That&apos;s why we source wholesome
              products we love and bring them to everyone at a fair price.
            </p>
            <div className="flex gap-4 pt-px">
              {socialLinks.map((link) => (
                <a
                  key={link.alt}
                  aria-label={link.alt}
                  className="inline-flex size-10 items-center justify-center rounded-[8px] bg-[rgba(134,230,250,0.1)] transition-transform duration-200 hover:-translate-y-0.5"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img alt="" className={link.imageClassName} src={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-6 pb-4">
              <h3 className="text-[16px] font-bold leading-6 text-[#0f172a]">
                {column.title}
              </h3>
              <div className="space-y-4 text-[14px] leading-5 text-[#0f172a]/70">
                {column.items.map((item) => (
                  <SiteLink
                    key={item.label}
                    className="block transition-colors duration-200 hover:text-[#6a9dd1]"
                    href={item.href}
                  >
                    {item.label}
                  </SiteLink>
                ))}
              </div>
            </div>
          ))}

          <div className="relative md:h-[192px]">
            <h3 className="text-[16px] font-bold leading-6 text-[#0f172a]">
              Stay Updated
            </h3>
            <p className="mt-6 text-[12px] leading-4 text-[#0f172a]/60">
              Get tips on pet health and special offers.
            </p>
            <div className="mt-8 flex gap-2">
              <input
                aria-label="Email address"
                className="h-10 flex-1 rounded-[8px] bg-[rgba(0,187,226,0.1)] px-3 text-[14px] text-[#0f172a] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] outline-none placeholder:text-[#6b7280]"
                placeholder="Email address"
                type="email"
              />
              <button
                className="inline-flex h-10 w-[41px] items-center justify-center rounded-[8px] bg-[#6a9dd1] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
                type="button"
              >
                <img alt="" className="h-4 w-[19px]" src={siteAssets.send} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[rgba(134,230,250,0.05)] pt-6 opacity-50 md:mt-[3cm]">
          <div className="flex flex-col gap-4 text-[12px] leading-4 text-[#0f172a] md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 Two Tails by Signature Market. All rights reserved.</p>
            <div className="flex gap-6">
              <SiteLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
                Privacy Policy
              </SiteLink>
              <SiteLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
                Terms of Service
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SitePage({
  activeLabel,
  children,
  coverHero = false,
}: {
  activeLabel: string;
  children: ReactNode;
  coverHero?: boolean;
}) {
  return (
    <main className="relative isolate min-w-0 overflow-x-clip bg-[#f5f8f8] pt-[var(--site-header-height)] text-[#0f172a]">
      <SiteHeader activeLabel={activeLabel} />
      <div className={coverHero ? "site-cover-page" : undefined}>{children}</div>
      <SiteFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
