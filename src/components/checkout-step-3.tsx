"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { CheckoutPageFrame } from "@/components/checkout-shell";
import {
  AlternateMethodNotice,
  CardIcon,
  CheckoutCallToAction,
  CheckoutCard,
  CtaLockIcon,
  expressShippingPrice,
  formatCurrency,
  HelpIcon,
  MethodRadio,
  PaymentFieldInput,
  PaymentFieldLabel,
  PaymentSecurityNotice,
  PaymentSelectionCard,
  processingFee,
  ProductLineItem,
  SatisfactionCard,
  SidebarHeading,
  standardShippingPrice,
  SummaryRow,
} from "@/components/checkout-shared";
import { useProductPrice } from "@/lib/auth-client";
import { useCheckoutDeliveryMethod, useCheckoutQuantity } from "@/lib/checkout-state";

type PaymentMethod = "card" | "bank" | "wallet";

const fpxBanks = [
  "Affin Bank",
  "Agrobank",
  "Alliance Bank",
  "AmBank",
  "Bank Islam",
  "Bank Muamalat",
  "Bank Rakyat",
  "BSN",
  "CIMB Clicks",
  "Hong Leong Bank",
  "HSBC Bank",
  "Kuwait Finance House",
  "Maybank2u",
  "OCBC Bank",
  "Public Bank",
  "RHB Bank",
  "Standard Chartered",
  "UOB",
] as const;

const eWalletOptions = ["GrabPay", "TNG eWallet", "ShopeePay"] as const;

function MethodBadge({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex size-10 items-center justify-center rounded-[12px] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

function Step3Summary({
  deliveryMethod,
  paymentLabel,
  quantity,
}: {
  deliveryMethod: "standard" | "express";
  paymentLabel: string;
  quantity: number;
}) {
  const unitPrice = useProductPrice();
  const subtotal = quantity * unitPrice;
  const shippingPrice =
    deliveryMethod === "express" ? expressShippingPrice : standardShippingPrice;
  const shippingTitle = deliveryMethod === "express" ? "Express" : "Standard";
  return (
    <div className="space-y-6">
      <CheckoutCard className="pb-10">
        <SidebarHeading>Order Summary</SidebarHeading>
        <div className="mt-5">
          <ProductLineItem compact quantity={quantity} />
        </div>
        <div className="mt-7 border-t border-[#f1f5f9] pt-7">
          <div className="space-y-3">
            <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
            <SummaryRow
              label={`Shipping (${shippingTitle})`}
              value={formatCurrency(shippingPrice)}
            />
            <SummaryRow label="Processing Fee" value={formatCurrency(processingFee)} />
          </div>
          <div className="mt-4 border-t border-[#f1f5f9] pt-4">
            <div className="flex items-end justify-between gap-4">
              <span className="text-[18px] font-extrabold leading-7 text-[#0f172a]">
                Total
              </span>
              <span className="text-[24px] font-extrabold leading-8 tracking-[-0.6px] text-[#0f172a]">
                {formatCurrency(subtotal + shippingPrice + processingFee)}
              </span>
            </div>
            <div className="mt-3 rounded-[10px] bg-[rgba(134,230,250,0.1)] px-3 py-2 text-[12px] font-semibold text-[#334155]">
              Paying with: {paymentLabel}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <CheckoutCallToAction href="/thank-you" icon={<CtaLockIcon />}>
            Complete Purchase
          </CheckoutCallToAction>
        </div>
        <p className="mx-auto mt-5 max-w-[240px] text-center text-[11px] leading-[16.5px] text-[#94a3b8]">
          By clicking &quot;Complete Purchase&quot;, you agree to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Refund Policy</span>.
        </p>
      </CheckoutCard>
      <SatisfactionCard />
    </div>
  );
}

function OptionTile({
  description,
  onClick,
  selected,
  title,
}: {
  description: string;
  onClick: () => void;
  selected: boolean;
  title: string;
}) {
  return (
    <button
      className={[
        "flex items-start gap-3 rounded-[12px] border px-4 py-4 text-left transition-transform duration-200 hover:-translate-y-0.5",
        selected
          ? "border-transparent bg-[rgba(174,214,255,0.28)] shadow-[0px_4px_4px_rgba(0,0,0,0.18)]"
          : "border-[#e2e8f0] bg-white",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      <MethodRadio selected={selected} />
      <div className="min-w-0">
        <p className="text-[14px] font-bold leading-5 text-[#0f172a]">{title}</p>
        <p className="mt-1 text-[12px] leading-4 text-[#64748b]">{description}</p>
      </div>
    </button>
  );
}

export function CheckoutStep3Page() {
  const [deliveryMethod] = useCheckoutDeliveryMethod();
  const [quantity] = useCheckoutQuantity();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedBank, setSelectedBank] =
    useState<(typeof fpxBanks)[number]>("Maybank2u");
  const [selectedWallet, setSelectedWallet] =
    useState<(typeof eWalletOptions)[number]>("GrabPay");

  const paymentLabel = useMemo(() => {
    if (paymentMethod === "bank") {
      return `Online Banking (FPX) - ${selectedBank}`;
    }

    if (paymentMethod === "wallet") {
      return `E-wallet - ${selectedWallet}`;
    }

    return "Credit / Debit Card";
  }, [paymentMethod, selectedBank, selectedWallet]);

  return (
    <CheckoutPageFrame
      aside={
        <Step3Summary
          deliveryMethod={deliveryMethod}
          paymentLabel={paymentLabel}
          quantity={quantity}
        />
      }
      backHref="/checkout/shipping"
      backLabel="Back to Shipping"
      progress={99}
      stepLabel="Step 3 of 3: Payment"
    >
      <section>
        <div className="flex items-center gap-2">
          <CreditCard className="size-[18px] text-[#67e8f9]" strokeWidth={2.2} />
          <h1 className="text-[18px] font-bold leading-7 text-[#0f172a]">Payment Method</h1>
        </div>
        <div className="mt-4 space-y-3">
          <button className="w-full text-left" onClick={() => setPaymentMethod("card")} type="button">
            <PaymentSelectionCard
              description="Visa, Mastercard, AMEX"
              icon={
                <MethodBadge className="bg-[rgba(15,23,42,0.08)] text-[#0f172a]">
                  <CreditCard className="size-5" strokeWidth={1.9} />
                </MethodBadge>
              }
              selected={paymentMethod === "card"}
              title="Credit / Debit Card"
            />
          </button>
          <button className="w-full text-left" onClick={() => setPaymentMethod("bank")} type="button">
            <PaymentSelectionCard
              description="Choose from major Malaysian online banking portals"
              icon={
                <MethodBadge className="bg-[rgba(106,157,209,0.14)] text-[#4f84bb]">
                  <Landmark className="size-5" strokeWidth={1.9} />
                </MethodBadge>
              }
              selected={paymentMethod === "bank"}
              title="Online Banking (FPX)"
            />
          </button>
          <button className="w-full text-left" onClick={() => setPaymentMethod("wallet")} type="button">
            <PaymentSelectionCard
              description="GrabPay, TNG eWallet, ShopeePay"
              icon={
                <MethodBadge className="bg-[rgba(134,230,250,0.18)] text-[#0d7e95]">
                  <Wallet className="size-5" strokeWidth={1.9} />
                </MethodBadge>
              }
              selected={paymentMethod === "wallet"}
              title="E-wallets"
            />
          </button>
        </div>
      </section>

      {paymentMethod === "card" ? (
        <section className="rounded-[12px] border border-[#e2e8f0] bg-white p-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.18),0px_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-[18px] font-bold leading-7 text-[#0f172a]">Card Details</h2>
          <div className="mt-6 space-y-5">
            <div className="space-y-1.5">
              <PaymentFieldLabel htmlFor="cardholder-name">Cardholder Name</PaymentFieldLabel>
              <PaymentFieldInput
                defaultValue="John Doe"
                id="cardholder-name"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1.5">
              <PaymentFieldLabel htmlFor="card-number">Card Number</PaymentFieldLabel>
              <PaymentFieldInput
                id="card-number"
                placeholder="0000 0000 0000 0000"
                trailing={<CardIcon />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <PaymentFieldLabel htmlFor="expiry-date">Expiry Date</PaymentFieldLabel>
                <PaymentFieldInput id="expiry-date" placeholder="MM / YY" />
              </div>
              <div className="space-y-1.5">
                <PaymentFieldLabel htmlFor="cvv">CVV</PaymentFieldLabel>
                <PaymentFieldInput
                  defaultValue="123"
                  id="cvv"
                  placeholder="123"
                  trailing={<HelpIcon />}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <PaymentSecurityNotice />
          </div>
        </section>
      ) : paymentMethod === "bank" ? (
        <section className="rounded-[12px] border border-[#e2e8f0] bg-white p-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.18),0px_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-[18px] font-bold leading-7 text-[#0f172a]">
            Online Banking (FPX)
          </h2>
          <p className="mt-3 max-w-[54ch] text-[14px] leading-6 text-[#64748b]">
            Select your preferred Malaysian bank and you&apos;ll be redirected to its
            secure FPX portal after reviewing your purchase.
          </p>
          <div className="mt-6 space-y-1.5">
            <PaymentFieldLabel htmlFor="fpx-bank">Choose your bank</PaymentFieldLabel>
            <select
              className="h-11 w-full rounded-[8px] border border-[#e2e8f0] bg-white px-3 text-[16px] text-[#0f172a] outline-none transition-colors duration-200 focus:border-[#6a9dd1]"
              id="fpx-bank"
              onChange={(event) =>
                setSelectedBank(event.target.value as (typeof fpxBanks)[number])
              }
              value={selectedBank}
            >
              {fpxBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 rounded-[10px] bg-[rgba(134,230,250,0.1)] px-4 py-3 text-[13px] font-semibold text-[#334155]">
            Selected bank: {selectedBank}
          </div>
          <div className="mt-6">
            <AlternateMethodNotice />
          </div>
        </section>
      ) : (
        <section className="rounded-[12px] border border-[#e2e8f0] bg-white p-[25px] shadow-[0px_4px_4px_rgba(0,0,0,0.18),0px_1px_2px_rgba(0,0,0,0.05)]">
          <h2 className="text-[18px] font-bold leading-7 text-[#0f172a]">E-wallets</h2>
          <p className="mt-3 max-w-[52ch] text-[14px] leading-6 text-[#64748b]">
            Pick the wallet you want to use at checkout. We support the three wallet
            options requested for this flow.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {eWalletOptions.map((wallet) => (
              <OptionTile
                key={wallet}
                description="Fast mobile payment option"
                onClick={() => setSelectedWallet(wallet)}
                selected={selectedWallet === wallet}
                title={wallet}
              />
            ))}
          </div>
          <div className="mt-5 rounded-[10px] bg-[rgba(134,230,250,0.1)] px-4 py-3 text-[13px] font-semibold text-[#334155]">
            Selected wallet: {selectedWallet}
          </div>
          <div className="mt-6">
            <AlternateMethodNotice wallet />
          </div>
        </section>
      )}
    </CheckoutPageFrame>
  );
}
