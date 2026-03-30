import type { Metadata } from "next";
import { CheckoutStep1Page } from "@/components/checkout-step-1";

export const metadata: Metadata = {
  title: "Checkout | Step 1 of 3",
  description: "Review your Two Tails cart and continue to shipping.",
};

export default function CheckoutRoute() {
  return <CheckoutStep1Page />;
}
