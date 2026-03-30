import type { Metadata } from "next";
import { RegisterPage } from "@/components/auth-pages";

export const metadata: Metadata = {
  title: "Register | Two Tails",
  description: "Create your Two Tails account.",
};

export default function RegisterRoute() {
  return <RegisterPage />;
}
