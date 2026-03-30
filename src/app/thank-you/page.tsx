import type { Metadata } from "next";
import { ThankYouPage } from "@/components/thank-you-page";

export const metadata: Metadata = {
  title: "Thank You | Two Tails",
  description:
    "Your Two Tails order is confirmed. Review your shipping, payment, and order details.",
};

export default function ThankYouRoute() {
  return <ThankYouPage />;
}
