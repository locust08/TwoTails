import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Two Tails | Wholesome Goodness For Every Tail",
  description:
    "Learn how Two Tails uses premium freeze-dried duck and tuna to create wholesome pet food for dogs and cats.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
