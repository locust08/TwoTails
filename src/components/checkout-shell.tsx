"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowLeft, PawPrint } from "lucide-react";
import { HeaderHeightSync } from "@/components/header-height-sync";
import {
  CompactNavMenu,
  FloatingWhatsAppButton,
  ProfileAvatarButton,
  SecondaryButton,
} from "@/components/site-shell";
import { useAuthState } from "@/lib/auth-client";
import { navItems, siteAssets } from "@/lib/site-data";

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function CheckoutLink({
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

function CheckoutHeader() {
  const authenticated = useAuthState();

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] bg-transparent px-3 pt-2 md:px-4 md:pt-2"
      data-site-header
    >
      <HeaderHeightSync />
      <div className="site-shell-inner-wide">
        <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3">
          <Link href="/">
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
                <CheckoutLink
                  key={item.label}
                  className="rounded-full px-4 py-[9px] text-[14px] font-semibold leading-5 text-[#262626] transition-all duration-200 hover:bg-[rgba(255,255,255,0.3)]"
                  href={item.href}
                >
                  {item.label}
                </CheckoutLink>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-4 xl:gap-[31px]">
            {authenticated ? (
              <ProfileAvatarButton />
            ) : (
              <div className="hidden xl:block">
                <SecondaryButton className="min-w-[156px]" href="/register">
                  Register/Login
                </SecondaryButton>
              </div>
            )}
            <CompactNavMenu
              actionHref={authenticated ? undefined : "/register"}
              actionLabel={authenticated ? undefined : "Register/Login"}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function CheckoutFooter() {
  return (
    <footer className="relative z-30 border-t border-[rgba(134,230,250,0.1)] bg-transparent px-4 py-8 md:px-10">
      <div className="site-shell-inner flex flex-col gap-4 text-[12px] leading-4 text-[#0f172a]/60 md:flex-row md:items-center md:justify-between md:text-[14px] md:leading-5">
        <p>&copy; 2026 Two Tails Pet Treats by Signature Market. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <CheckoutLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Privacy Policy
          </CheckoutLink>
          <CheckoutLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Terms of Service
          </CheckoutLink>
          <CheckoutLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Help Center
          </CheckoutLink>
        </div>
      </div>
    </footer>
  );
}

function StepProgress({
  progress,
  stepLabel,
}: {
  progress: number;
  stepLabel: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[16px] font-semibold leading-6 text-[#0f172a]">{stepLabel}</p>
        <p className="text-[14px] leading-5 text-[#64748b]">{progress}% Complete</p>
      </div>
      <div className="h-2 rounded-full bg-[rgba(134,230,250,0.2)]">
        <div
          className="h-full rounded-full bg-[#86e6fa] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-2 pt-0.5 text-[16px] leading-6 text-[#64748b]">
        <PawPrint className="size-[13px] text-[#94a3b8]" strokeWidth={2.25} />
        <p>Almost there! Treats for your furry friend are waiting.</p>
      </div>
    </div>
  );
}

export function CheckoutPageFrame({
  aside,
  backHref,
  backLabel = "Back",
  children,
  progress,
  stepLabel,
}: {
  aside: ReactNode;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
  progress: number;
  stepLabel: string;
}) {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#f5f8f8] pt-[var(--site-header-height)] text-[#0f172a]">
      <CheckoutHeader />
      <div className="site-shell-inner pb-14 pt-8">
        {backHref ? (
          <div className="mb-4">
            <CheckoutLink
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(134,230,250,0.16)] bg-white px-4 py-2 text-[14px] font-semibold text-[#334155] shadow-[0px_4px_10px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
              href={backHref}
            >
              <ArrowLeft className="size-4" strokeWidth={2.3} />
              <span>{backLabel}</span>
            </CheckoutLink>
          </div>
        ) : null}
        <StepProgress progress={progress} stepLabel={stepLabel} />

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_374px] xl:gap-12">
          <div className="space-y-8">{children}</div>
          <div className="xl:pt-2">
            <div className={joinClasses("xl:sticky xl:top-[calc(var(--site-header-height,86px)+1.75rem)]")}>
              {aside}
            </div>
          </div>
        </div>
      </div>
      <CheckoutFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
