import type { Metadata } from "next";
import { CheckoutStep2Page } from "@/components/checkout-step-2";

export const metadata: Metadata = {
  title: "Checkout | Step 2 of 3",
  description: "Choose your shipping address and delivery method for Two Tails.",
};

export default function CheckoutShippingRoute() {
  return <CheckoutStep2Page />;
}
