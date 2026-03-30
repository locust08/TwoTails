"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  CheckCircle2,
  CreditCard,
  MapPinned,
} from "lucide-react";
import { HeaderHeightSync } from "@/components/header-height-sync";
import {
  CheckoutLink,
} from "@/components/checkout-shell";
import {
  expressShippingPrice,
  formatCurrency,
  standardShippingPrice,
} from "@/components/checkout-shared";
import {
  CompactNavMenu,
  FloatingWhatsAppButton,
  PrimaryButton,
  ProfileAvatarButton,
  SecondaryButton,
} from "@/components/site-shell";
import { useAuthState, useProductPrice } from "@/lib/auth-client";
import { useCheckoutDeliveryMethod, useCheckoutQuantity } from "@/lib/checkout-state";
import { navItems, productUrl, siteAssets } from "@/lib/site-data";

function ThankYouHeader() {
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
            <PrimaryButton className="min-w-[96px] px-5 text-[13px] sm:min-w-[112px] sm:px-6 sm:text-[14px]" href={productUrl}>
              Buy More
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
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function ThankYouFooter() {
  return (
    <footer className="relative z-30 border-t border-[rgba(134,230,250,0.1)] bg-white px-4 py-8 md:px-10">
      <div className="site-shell-inner flex flex-col gap-4 text-[12px] leading-4 text-[#0f172a]/60 md:flex-row md:items-center md:justify-between md:text-[14px] md:leading-5">
        <p>&copy; 2026 Two Tails Pet Treats by Signature Market. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <CheckoutLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Privacy Policy
          </CheckoutLink>
          <CheckoutLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Terms of Service
          </CheckoutLink>
          <CheckoutLink
            className="transition-colors duration-200 hover:text-[#6a9dd1]"
            href="/contact-us"
          >
            Help Center
          </CheckoutLink>
        </div>
      </div>
    </footer>
  );
}

function InfoCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#f1f5f9] bg-white p-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.16),0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2">
        <span className="text-[#67e8f9]">{icon}</span>
        <h3 className="text-[18px] font-bold leading-7 text-[#0f172a]">{title}</h3>
      </div>
      <div className="mt-4 text-[14px] leading-[22.75px] text-[#475569]">{children}</div>
    </div>
  );
}

export function ThankYouPage() {
  const [deliveryMethod] = useCheckoutDeliveryMethod();
  const [quantity] = useCheckoutQuantity();
  const unitPrice = useProductPrice();
  const subtotal = quantity * unitPrice;
  const shippingPrice =
    deliveryMethod === "express" ? expressShippingPrice : standardShippingPrice;
  const shippingTitle = deliveryMethod === "express" ? "Express" : "Standard";
  const totalPaid = subtotal + shippingPrice + 3;

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-white pt-[var(--site-header-height)] text-[#0f172a]">
      <ThankYouHeader />

      <div className="site-shell-inner pb-16 pt-10">
        <section className="overflow-hidden rounded-[12px] border border-[#f1f5f9] bg-white shadow-[0px_7px_4px_rgba(0,0,0,0.18),0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="grid items-stretch md:grid-cols-[445px_1fr]">
            <div className="relative min-h-[260px] md:min-h-[389px]">
              <img
                alt="Happy dog and cat portrait"
                className="h-full w-full object-cover object-center"
                src={siteAssets.thankYouHero}
              />
              <div className="absolute inset-0 bg-[rgba(166,166,166,0.18)]" />
            </div>

            <div className="flex items-center p-8 md:p-[32px]">
              <div className="max-w-[340px]">
                <div className="inline-flex size-16 items-center justify-center rounded-full bg-[rgba(141,223,255,0.2)]">
                  <CheckCircle2 className="size-[30px] text-[#67e8f9]" strokeWidth={2.1} />
                </div>
                <h1 className="mt-6 text-[36px] font-extrabold leading-10 tracking-[-0.025em] text-[#0f172a]">
                  Order Successful!
                </h1>
                <p className="mt-4 text-[18px] leading-[29.25px] text-[#475569]">
                  Your furry friend&apos;s goodies are on the way. We&apos;ve sent a
                  confirmation email to you with all the tracking details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <InfoCard
            icon={<MapPinned className="size-[22px]" strokeWidth={2.1} />}
            title="Shipping Address"
          >
            <p>John Doe</p>
            <p>123 Puppy Lane, Tailwag Terrace</p>
            <p>San Francisco, CA 94107</p>
            <p>United States</p>
          </InfoCard>

          <InfoCard
            icon={<CreditCard className="size-[22px]" strokeWidth={2.1} />}
            title="Payment Method"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex size-9 items-center justify-center rounded-[8px] bg-[#f8fafc] text-[#0f172a]">
                <CreditCard className="size-5" strokeWidth={2.1} />
              </div>
              <div>
                <p className="font-semibold text-[#0f172a]">Visa ending in 4242</p>
                <p className="text-[12px] leading-4 text-[#94a3b8]">Billed on Mar 19, 2026</p>
              </div>
            </div>
          </InfoCard>
        </div>

        <section className="mt-8 overflow-hidden rounded-[12px] border border-[#f1f5f9] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.16),0px_1px_2px_rgba(0,0,0,0.05)]">
          <div className="border-b border-[#f1f5f9] bg-[rgba(248,250,252,0.5)] px-6 py-4">
            <h2 className="text-[18px] font-bold leading-[22.5px] tracking-[-0.025em] text-[#0f172a]">
              Order Summary
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4">
              <img
                alt="Freeze-Dried Duck & Tuna Bites"
                className="h-[65px] w-[66px] rounded-[10px] object-cover object-center"
                src={siteAssets.checkoutProduct}
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] font-bold leading-5 text-[#0f172a]">
                  Freeze-Dried Duck &amp; Tuna Bites (For Dogs &amp; Cats)
                </h3>
                <p className="mt-1 text-[12px] leading-4 text-[#64748b]">
                  Quantity: {quantity} &bull; 65g
                </p>
              </div>
              <p className="text-[14px] font-bold leading-5 text-[#0f172a]">
                {formatCurrency(subtotal)}
              </p>
            </div>

            <div className="mt-4 border-t border-dashed border-[#e2e8f0] pt-4 text-[14px] leading-5">
              <div className="space-y-2 text-[#64748b]">
                <div className="flex items-center justify-between gap-4">
                  <span>Subtotal</span>
                  <span className="text-[#0f172a]">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>{`Shipping (${shippingTitle})`}</span>
                  <span className="text-[#0f172a]">{formatCurrency(shippingPrice)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Processing Fee</span>
                  <span className="text-[#0f172a]">RM3.00</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[#f1f5f9] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[20px] font-bold leading-7 text-[#0f172a]">
                    Total Paid
                  </span>
                  <span className="text-[32px] font-extrabold leading-9 tracking-[-0.04em] text-[#0f172a]">
                    {formatCurrency(totalPaid)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 flex justify-center">
          <PrimaryButton className="min-w-[300px] rounded-[12px] px-10 py-3.5 text-[16px] leading-6" href={productUrl}>
            Purchase More
          </PrimaryButton>
        </div>
      </div>

      <ThankYouFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
