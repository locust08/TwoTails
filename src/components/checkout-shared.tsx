"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Circle,
  CircleHelp,
  CreditCard,
  Info,
  Lock,
  MapPinned,
  PawPrint,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { CheckoutLink } from "@/components/checkout-shell";
import {
  regularUnitPrice,
  useAuthState,
  useProductPrice,
} from "@/lib/auth-client";
import { siteAssets } from "@/lib/site-data";

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const standardShippingPrice = 4.99;
export const expressShippingPrice = 12.5;
export const processingFee = 3;

export function formatCurrency(value: number) {
  return `RM${value.toFixed(2)}`;
}

export function CheckoutCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={joinClasses(
        "rounded-[16px] border border-[rgba(134,230,250,0.1)] bg-white p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.12),0px_20px_25px_-5px_rgba(134,230,250,0.05),0px_8px_10px_-6px_rgba(134,230,250,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SidebarHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-[20px] font-extrabold leading-7 text-[#0f172a]">{children}</h2>;
}

export function SummaryRow({
  label,
  strong,
  value,
}: {
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-[14px] leading-5">
      <span className={strong ? "font-semibold text-[#0f172a]" : "text-[#64748b]"}>{label}</span>
      <span className={strong ? "font-semibold text-[#0f172a]" : "text-[#0f172a]"}>{value}</span>
    </div>
  );
}

export function CheckoutCallToAction({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href?: string;
  icon: ReactNode;
}) {
  const className =
    "inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#86e6fa] px-6 text-[18px] font-bold text-[#0f172a] shadow-[0px_4px_6px_-1px_rgba(134,230,250,0.2),0px_2px_4px_-2px_rgba(134,230,250,0.2)] transition-transform duration-200 hover:-translate-y-0.5";

  if (href) {
    return (
      <CheckoutLink className={className} href={href}>
        {icon}
        <span>{children}</span>
        <ArrowRight className="size-4" strokeWidth={2.4} />
      </CheckoutLink>
    );
  }

  return (
    <button className={className} type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function ProductLineItem({
  compact,
  quantity,
}: {
  compact?: boolean;
  quantity: number;
}) {
  const authenticated = useAuthState();
  const unitPrice = useProductPrice();
  const originalTotal = regularUnitPrice * quantity;
  const discountedTotal = unitPrice * quantity;

  return (
    <div className={joinClasses("flex gap-4", compact ? "items-start" : "items-center")}>
      <div
        className={joinClasses(
          "overflow-hidden rounded-[10px] bg-white",
          compact ? "size-[66px]" : "h-[128px] w-[130px]",
        )}
      >
        <img
          alt="Freeze-Dried Duck & Tuna Bites"
          className="h-full w-full object-cover object-center"
          src={siteAssets.checkoutProduct}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className={joinClasses("min-w-0", compact ? "max-w-[210px]" : "max-w-[380px]")}>
            <h3
              className={joinClasses(
                "font-bold text-[#0f172a]",
                compact ? "text-[12px] leading-[15px]" : "text-[18px] leading-7",
              )}
            >
              Freeze-Dried Duck &amp; Tuna Bites (For Dogs &amp; Cats)
            </h3>
            <p
              className={joinClasses(
                "mt-1 text-[#64748b]",
                compact ? "text-[12px] leading-4" : "text-[14px] leading-5",
              )}
            >
              {compact ? (
                <>
                  Quantity: {quantity} &bull; 65g
                </>
              ) : (
                <>Signature Market Quality &bull; 65g</>
              )}
            </p>
          </div>
          {!compact ? (
            <button
              aria-label="Remove item"
              className="inline-flex size-10 items-center justify-center rounded-[10px] text-[#94a3b8] transition-colors duration-200 hover:bg-[#f5f8f8] hover:text-[#64748b]"
              type="button"
            >
              <Trash2 className="size-[18px]" strokeWidth={1.9} />
            </button>
          ) : null}
        </div>
        <div
          className={joinClasses(
            "flex flex-wrap items-center gap-x-2 gap-y-1",
            compact ? "mt-2" : "mt-5",
          )}
        >
          <p
            className={joinClasses(
              "font-bold text-[#0f172a]",
              compact ? "text-[14px] leading-5" : "text-[20px] leading-7",
            )}
          >
            {formatCurrency(discountedTotal)}
          </p>
          {authenticated ? (
            <span
              className={joinClasses(
                "text-[#94a3b8] line-through decoration-[1.5px] decoration-[#94a3b8]",
                compact ? "text-[12px] leading-4" : "text-[15px] leading-5",
              )}
            >
              {formatCurrency(originalTotal)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SummaryMetaList({ estimatedDelivery }: { estimatedDelivery: string }) {
  return (
    <div className="space-y-3 text-[12px] leading-4 text-[#64748b]">
      <div className="flex items-center gap-3">
        <ShieldCheck className="size-[14px] text-[#94a3b8]" strokeWidth={2} />
        <span>Secure Checkout Guaranteed</span>
      </div>
      <div className="flex items-center gap-3">
        <Truck className="size-[14px] text-[#94a3b8]" strokeWidth={2} />
        <span>{estimatedDelivery}</span>
      </div>
    </div>
  );
}

export function SatisfactionCard() {
  return (
    <div className="rounded-[12px] bg-[rgba(134,230,250,0.1)] p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3">
        <BadgeCheck className="size-5 text-[#7dd3fc]" strokeWidth={1.9} />
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[-0.3px] text-[#0f172a]">
            Satisfaction Guaranteed
          </p>
          <p className="text-[12px] leading-4 text-[#475569]">
            100% money back if your pet doesn&apos;t love it!
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterBanner() {
  const authenticated = useAuthState();

  if (authenticated) {
    return (
      <div className="rounded-[12px] border border-dashed border-[rgba(134,230,250,0.3)] bg-[rgba(134,230,250,0.05)] px-6 py-5">
        <div className="flex items-center gap-3 text-[14px] leading-5 text-[#475569]">
          <Info className="size-5 text-[#67e8f9]" strokeWidth={2} />
          <p>
            Member pricing unlocked. You&apos;re shopping at{" "}
            <span className="font-bold">{formatCurrency(25)}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[12px] border border-dashed border-[rgba(134,230,250,0.3)] bg-[rgba(134,230,250,0.05)] px-6 py-5">
      <div className="flex items-center gap-3 text-[14px] leading-5 text-[#475569]">
        <Info className="size-5 text-[#67e8f9]" strokeWidth={2} />
        <p>
          <CheckoutLink className="font-bold text-[#6a9dd1] underline" href="/register">
            REGISTER
          </CheckoutLink>
          <span> to get </span>
          <span className="font-bold">30% Discount!</span>
        </p>
      </div>
    </div>
  );
}

export function CirclePlus({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <span className={className}>
      <svg
        aria-hidden="true"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 4.167V15.833M4.167 10H15.833"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth ?? 2}
        />
      </svg>
    </span>
  );
}

export function MethodRadio({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-[#0f172a] text-white">
        <Circle className="size-[18px] fill-current" strokeWidth={2.2} />
      </span>
    );
  }

  return <span className="inline-flex size-5 rounded-full border border-[#cbd5e1]" />;
}

export function PaymentFieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <label className="text-[14px] font-semibold leading-5 text-[#334155]" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function PaymentFieldInput({
  defaultValue,
  id,
  placeholder,
  trailing,
}: {
  defaultValue?: string;
  id: string;
  placeholder: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative">
      <input
        className="h-11 w-full rounded-[8px] border border-[#e2e8f0] bg-white px-3 pr-11 text-[16px] text-[#0f172a] outline-none transition-colors duration-200 placeholder:text-[#6b7280] focus:border-[#6a9dd1]"
        defaultValue={defaultValue}
        id={id}
        placeholder={placeholder}
        type="text"
      />
      {trailing ? (
        <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-[#94a3b8]">
          {trailing}
        </span>
      ) : null}
    </div>
  );
}

export function PaymentSelectionCard({
  description,
  icon,
  selected,
  title,
}: {
  description: string;
  icon: ReactNode;
  selected: boolean;
  title: string;
}) {
  return (
    <div
      className={joinClasses(
        "flex items-center gap-4 rounded-[12px] border-2 px-4 py-4 transition-transform duration-200",
        selected
          ? "border-transparent bg-[rgba(174,214,255,0.28)] shadow-[0px_4px_4px_rgba(0,0,0,0.18)]"
          : "border-[#e2e8f0] bg-white",
      )}
    >
      <MethodRadio selected={selected} />
      <div className="flex-1">
        <p className="text-[14px] font-bold leading-5 text-[#0f172a]">{title}</p>
        <p className="text-[12px] leading-4 text-[#64748b]">{description}</p>
      </div>
      <span className="text-[#94a3b8]">{icon}</span>
    </div>
  );
}

export function PaymentSecurityNotice() {
  return (
    <div className="rounded-[8px] border border-[#f1f5f9] bg-[#f8fafc] p-4">
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 size-4 text-[#22c55e]" strokeWidth={2.1} />
        <p className="text-[12px] leading-[19.5px] text-[#64748b]">
          Your transaction is secured with 256-bit SSL encryption. We do not store
          your full card details on our servers.
        </p>
      </div>
    </div>
  );
}

export function AlternateMethodNotice({ wallet }: { wallet?: boolean }) {
  return (
    <div className="rounded-[8px] border border-[#f1f5f9] bg-[#f8fafc] p-4">
      <div className="flex items-start gap-3">
        <MapPinned className="mt-0.5 size-4 text-[#6a9dd1]" strokeWidth={2.1} />
        <p className="text-[12px] leading-[19.5px] text-[#64748b]">
          {wallet
            ? "Choose your preferred e-wallet after clicking Complete Purchase and follow the provider's steps to finish the payment."
            : "You will be redirected to your preferred banking portal after reviewing your order to complete the payment securely."}
        </p>
      </div>
    </div>
  );
}

export function CtaPawIcon() {
  return <PawPrint className="size-5" strokeWidth={2.2} />;
}

export function CtaLockIcon() {
  return <Lock className="size-4" strokeWidth={2.3} />;
}

export function CardIcon() {
  return <CreditCard className="size-5" strokeWidth={1.9} />;
}

export function HelpIcon() {
  return <CircleHelp className="size-5" strokeWidth={1.9} />;
}

export function SelectionCheck() {
  return <CheckCircle2 className="absolute right-4 top-4 size-5 text-[#67e8f9]" strokeWidth={2.2} />;
}
