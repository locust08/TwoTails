import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | Two Tails",
  description:
    "Reach out to the Two Tails team for product questions, order support, and more.",
};

export default function ContactUsRoute() {
  return <ContactPage />;
}
