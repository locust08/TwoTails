import type { Metadata } from "next";
import { BenefitsPage } from "@/components/benefits-page";

export const metadata: Metadata = {
  title: "Benefits & Ingredients | Two Tails Freeze-Dried Bites",
  description:
    "Explore the benefits and ingredients behind Two Tails freeze-dried duck and tuna bites for dogs and cats.",
};

export default function BenefitsRoute() {
  return <BenefitsPage />;
}
