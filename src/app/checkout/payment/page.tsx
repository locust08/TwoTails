import type { Metadata } from "next";
import { CheckoutStep3Page } from "@/components/checkout-step-3";

export const metadata: Metadata = {
  title: "Checkout | Step 3 of 3",
  description: "Complete your Two Tails purchase with the payment method of your choice.",
};

export default function CheckoutPaymentRoute() {
  return <CheckoutStep3Page />;
}
