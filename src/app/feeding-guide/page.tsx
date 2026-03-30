import type { Metadata } from "next";
import { FeedingPage } from "@/components/feeding-page";

export const metadata: Metadata = {
  title: "Feeding Guide & FAQ | Two Tails Freeze-Dried Bites",
  description:
    "Serving tips, daily feeding guide, storage advice, and frequently asked questions for Two Tails Freeze-Dried Duck & Tuna Bites.",
};

export default function FeedingGuideRoute() {
  return <FeedingPage />;
}
