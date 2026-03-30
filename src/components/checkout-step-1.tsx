"use client";

import { CheckoutPageFrame } from "@/components/checkout-shell";
import {
  CheckoutCallToAction,
  CheckoutCard,
  CtaPawIcon,
  formatCurrency,
  processingFee,
  RegisterBanner,
  SidebarHeading,
  standardShippingPrice,
  SummaryMetaList,
  SummaryRow,
} from "@/components/checkout-shared";
import { ProductLineItem } from "@/components/checkout-shared";
import { useProductPrice } from "@/lib/auth-client";
import { useCheckoutQuantity } from "@/lib/checkout-state";

function CartProductCard({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  return (
    <div className="rounded-[12px] border border-[rgba(134,230,250,0.1)] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <ProductLineItem quantity={quantity} />
      <div className="mt-5 flex justify-end">
        <div className="inline-flex items-center overflow-hidden rounded-[8px] border border-[rgba(134,230,250,0.2)] bg-[#f5f8f8]">
          <button
            className="inline-flex h-10 w-10 items-center justify-center text-[18px] text-[#0f172a] transition-colors duration-200 hover:bg-[#eaf4f8]"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            type="button"
          >
            -
          </button>
          <span className="inline-flex h-10 min-w-10 items-center justify-center text-[16px] font-semibold text-[#0f172a]">
            {quantity}
          </span>
          <button
            className="inline-flex h-10 w-10 items-center justify-center text-[18px] text-[#0f172a] transition-colors duration-200 hover:bg-[#eaf4f8]"
            onClick={() => setQuantity(quantity + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function Step1Summary({ quantity }: { quantity: number }) {
  const unitPrice = useProductPrice();
  const subtotal = quantity * unitPrice;
  const total = subtotal + standardShippingPrice + processingFee;

  return (
    <div className="space-y-6">
      <CheckoutCard>
        <SidebarHeading>Order Summary</SidebarHeading>
        <div className="mt-6 space-y-4">
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
          <SummaryRow label="Shipping Estimation" value={formatCurrency(standardShippingPrice)} />
          <SummaryRow label="Processing Tax" value={formatCurrency(processingFee)} />
        </div>
        <div className="mt-4 border-t border-[rgba(134,230,250,0.1)] pt-4">
          <div className="flex items-end justify-between gap-4">
            <span className="text-[18px] font-bold leading-7 text-[#0f172a]">Total</span>
            <span className="text-[24px] font-extrabold leading-8 tracking-[-0.6px] text-[#0f172a]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <label className="text-[14px] font-medium leading-5 text-[#334155]" htmlFor="promo-code">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              className="h-11 flex-1 rounded-[8px] border border-[rgba(134,230,250,0.2)] bg-[#f5f8f8] px-3 text-[14px] text-[#0f172a] outline-none transition-colors duration-200 placeholder:text-[#6b7280] focus:border-[#6a9dd1]"
              id="promo-code"
              placeholder="Enter code"
              type="text"
            />
            <button
              className="inline-flex h-11 items-center justify-center rounded-[8px] bg-[#0f172a] px-4 text-[14px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="mt-6">
          <CheckoutCallToAction href="/checkout/shipping" icon={<CtaPawIcon />}>
            Proceed to Shipping
          </CheckoutCallToAction>
        </div>
        <div className="mt-6">
          <SummaryMetaList estimatedDelivery="Estimated delivery: 2-3 business days" />
        </div>
      </CheckoutCard>
    </div>
  );
}

export function CheckoutStep1Page() {
  const [quantity, setQuantity] = useCheckoutQuantity({ resetOnMount: true });

  return (
    <CheckoutPageFrame aside={<Step1Summary quantity={quantity} />} progress={33} stepLabel="Step 1 of 3: Cart">
      <h1 className="text-[36px] font-extrabold leading-10 tracking-[-0.9px] text-[#0f172a]">
        Your Cart
      </h1>

      <CartProductCard quantity={quantity} setQuantity={setQuantity} />

      <RegisterBanner />
    </CheckoutPageFrame>
  );
}
