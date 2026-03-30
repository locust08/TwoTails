import type { Metadata } from "next";
import { LoginPage } from "@/components/auth-pages";

export const metadata: Metadata = {
  title: "Login | Two Tails",
  description: "Sign in to your Two Tails account.",
};

export default function LoginRoute() {
  return <LoginPage />;
}
