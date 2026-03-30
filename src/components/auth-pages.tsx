"use client";

import Link from "next/link";
import { useState } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  PawPrint,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  User,
} from "lucide-react";
import { HeaderHeightSync } from "@/components/header-height-sync";
import {
  CompactNavMenu,
  FloatingWhatsAppButton,
  ProfileAvatarButton,
  SecondaryButton,
} from "@/components/site-shell";
import { setAuthenticated, useAuthState } from "@/lib/auth-client";
import { navItems, siteAssets } from "@/lib/site-data";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function AuthLink({
  children,
  className,
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">) {
  if (isExternalHref(href)) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} {...props}>
      {children}
    </Link>
  );
}

function AuthHeader({
  actionHref,
  actionLabel,
}: {
  actionHref: string;
  actionLabel: string;
}) {
  const authenticated = useAuthState();

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[1000] bg-transparent px-3 pt-2 md:px-4 md:pt-2"
        data-site-header
      >
        <HeaderHeightSync />
        <div className="site-shell-inner-wide">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-3">
            <Link href="/">
              <img
                alt="Signature Market"
                className="h-auto w-[160px] md:w-[194px]"
                decoding="async"
                src={siteAssets.logo}
              />
            </Link>

            <nav className="hidden rounded-full border border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(255,255,255,0.18))] p-[5px] shadow-[0px_10px_24px_rgba(15,23,42,0.1),inset_0px_1px_0px_rgba(255,255,255,0.52)] backdrop-blur-[16px] xl:block">
              <div className="flex items-center gap-1 rounded-full p-1">
                {navItems.map((item) => (
                  <AuthLink
                    key={item.label}
                    className="rounded-full px-4 py-[9px] text-[14px] font-semibold leading-5 text-[#262626] transition-all duration-200 hover:bg-[rgba(255,255,255,0.3)]"
                    href={item.href}
                  >
                    {item.label}
                  </AuthLink>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 md:gap-4 xl:gap-[31px]">
              {authenticated ? (
                <ProfileAvatarButton />
              ) : (
                <div className="hidden xl:block">
                  <SecondaryButton className="min-w-[156px]" href={actionHref}>
                    {actionLabel}
                  </SecondaryButton>
                </div>
              )}
              <CompactNavMenu
                actionHref={authenticated ? undefined : actionHref}
                actionLabel={authenticated ? undefined : actionLabel}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function AuthFooter() {
  return (
    <footer className="px-4 pb-8 pt-6 md:px-10">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-4 text-[12px] leading-4 text-[#0f172a]/60 md:flex-row md:items-center md:justify-between md:text-[14px] md:leading-5">
        <p>&copy; 2026 Two Tails Pet Treats by Signature Market. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <AuthLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Privacy Policy
          </AuthLink>
          <AuthLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="#">
            Terms of Service
          </AuthLink>
          <AuthLink className="transition-colors duration-200 hover:text-[#6a9dd1]" href="/contact-us">
            Help Center
          </AuthLink>
        </div>
      </div>
    </footer>
  );
}

function Field({
  autoComplete,
  icon,
  id,
  label,
  placeholder,
  trailing,
  type = "text",
  value,
  onChange,
  soft,
}: {
  autoComplete?: string;
  icon: ReactNode;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  soft?: boolean;
  trailing?: ReactNode;
  type?: string;
  value: string;
}) {
  return (
    <label className="block w-full" htmlFor={id}>
      <span className="mb-2 block pl-1 text-[12px] font-bold uppercase tracking-[0.6px] text-[#3e494b] md:text-[13px] md:tracking-[0.7px]">
        {label}
      </span>
      <div
        className={joinClasses(
          "relative flex items-center overflow-hidden rounded-[14px] border px-4 py-3 shadow-[inset_0px_1px_0px_rgba(255,255,255,0.3)]",
          soft
            ? "border-transparent bg-[#eef3f5]"
            : "border-[#bdc8cb] bg-white",
        )}
      >
        <span className="mr-3 text-[#6e797c]">{icon}</span>
        <input
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-[16px] font-medium text-[#181c1d] outline-none placeholder:text-[#6b7280]"
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {trailing ? <span className="ml-3 text-[#7c8b90]">{trailing}</span> : null}
      </div>
    </label>
  );
}

function RegisterCard() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("hello@example.com");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  return (
    <div className="relative w-full max-w-[420px]">
      <PawPrint className="pointer-events-none absolute -left-[138px] top-[84px] hidden size-[104px] rotate-[-14deg] text-[#dff1f6] lg:block" strokeWidth={1.25} />
      <div className="pointer-events-none absolute -bottom-[18px] -right-[124px] hidden rotate-[16deg] text-[#d7eff6] lg:block">
        <Sprout className="size-[116px]" strokeWidth={1.2} />
      </div>

      <div className="rounded-[24px] border border-white/40 bg-white/82 p-5 shadow-[0px_4px_4px_rgba(0,0,0,0.2),0px_20px_30px_rgba(207,250,254,0.5)] backdrop-blur-[8px] md:px-7 md:py-6">
        <div className="text-center">
          <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[#181c1d] md:text-[34px]">
            Create Account
          </h1>
          <p className="mt-1.5 text-[13px] text-[#3e494b] md:text-[14px]">
            Join the Two Tails family today
          </p>
        </div>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();
            setAuthenticated(false);
            window.location.href = "/login";
          }}
        >
          <div className="space-y-3.5">
          <Field
            icon={<User className="size-4" strokeWidth={2} />}
            id="register-full-name"
            label="Full Name"
            onChange={setFullName}
            placeholder="John Doe"
            autoComplete="name"
            value={fullName}
          />
          <Field
            icon={<Mail className="size-4" strokeWidth={2} />}
            id="register-email"
            label="Email Address"
            onChange={setEmail}
            placeholder="hello@example.com"
            autoComplete="email"
            value={email}
          />
          <Field
            icon={<Lock className="size-4" strokeWidth={2} />}
            id="register-password"
            label="Password"
            onChange={setPassword}
            placeholder="••••••••"
            autoComplete="new-password"
            type="password"
            value={password}
          />
          <Field
            icon={<ShieldCheck className="size-4" strokeWidth={2} />}
            id="register-confirm-password"
            label="Confirm Password"
            onChange={setConfirmPassword}
            placeholder="••••••••"
            autoComplete="new-password"
            type="password"
            value={confirmPassword}
          />
          </div>

          <button
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-black px-6 py-3 text-[15px] font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,104,119,0.2),0px_4px_6px_-4px_rgba(0,104,119,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
            type="submit"
          >
            <span>Create Account</span>
            <ArrowRight className="size-4" strokeWidth={2.4} />
          </button>
        </form>

        <div className="mt-4 border-t border-[rgba(189,200,203,0.3)] pt-4 text-center text-[13px] text-[#3e494b]">
          <span>Already have an account? </span>
          <AuthLink className="font-bold text-[#6a9dd1]" href="/login">
            Sign In
          </AuthLink>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-5 text-[#a8b1b6]/80">
        <PawPrint className="size-5" strokeWidth={2} />
        <Heart className="size-5" strokeWidth={2} />
        <PawPrint className="size-5" strokeWidth={2} />
      </div>
    </div>
  );
}

function LoginCard() {
  const [email, setEmail] = useState("hello@twotails.com");
  const [password, setPassword] = useState("password");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full max-w-[432px]">
      <PawPrint className="pointer-events-none absolute -left-[136px] top-[42px] hidden size-[112px] text-[#deedf3] lg:block" strokeWidth={1.25} />
      <PawPrint className="pointer-events-none absolute -bottom-[4px] -right-[138px] hidden size-[132px] rotate-[18deg] text-[#deedf3] lg:block" strokeWidth={1.25} />
      <div className="pointer-events-none absolute left-1/4 top-[38%] hidden h-56 w-40 rounded-full bg-[rgba(0,104,119,0.05)] blur-[32px] lg:block" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 hidden h-60 w-56 rounded-full bg-[rgba(66,100,107,0.05)] blur-[32px] lg:block" />

      <div className="rounded-[32px] border border-white bg-white p-6 shadow-[0px_25px_50px_-12px_rgba(0,104,119,0.1)] md:px-8 md:py-7">
        <div className="text-center">
          <div className="mx-auto flex size-[64px] items-center justify-center overflow-hidden rounded-full bg-[#c5e9f1]">
            <img
              alt="Two Tails pets avatar"
              className="h-full w-full object-cover object-center"
              src={siteAssets.thankYouHero}
            />
          </div>
          <h1 className="mt-4 text-[30px] font-extrabold tracking-[-0.03em] text-[#181c1d] md:text-[36px]">
            Welcome Back!
          </h1>
          <p className="mt-1.5 text-[14px] font-medium text-[#3e494b]">
            Sign in to your Two Tails account.
          </p>
        </div>

        <form
          className="mt-7"
          onSubmit={(event) => {
            event.preventDefault();
            setAuthenticated(true);
            window.location.href = "/";
          }}
        >
          <div className="space-y-4">
            <Field
              icon={<Mail className="size-4" strokeWidth={2} />}
              id="login-email"
              label="Email Address"
              onChange={setEmail}
              placeholder="hello@twotails.com"
              soft
              autoComplete="email"
              value={email}
            />
            <Field
              icon={<Lock className="size-4" strokeWidth={2} />}
              id="login-password"
              label="Password"
              onChange={setPassword}
              placeholder="••••••••"
              soft
              autoComplete="current-password"
              trailing={
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="transition-colors duration-200 hover:text-[#4b5563]"
                  onClick={() => setShowPassword((value) => !value)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="size-[18px]" strokeWidth={2} />
                  ) : (
                    <Eye className="size-[18px]" strokeWidth={2} />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
              value={password}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[13px]">
              <label className="inline-flex cursor-pointer items-center gap-3 text-[#3e494b]">
                <input
                  checked={remember}
                  className="size-5 rounded-[4px] border border-[#bdc8cb] accent-[#6a9dd1]"
                  onChange={(event) => setRemember(event.target.checked)}
                  type="checkbox"
                />
                <span className="font-semibold">Remember Me</span>
              </label>
              <button className="font-bold text-[#6a9dd1]" type="button">
                Forgot Password?
              </button>
            </div>

            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#1b1b1b] px-6 py-3.5 text-[16px] font-extrabold text-white shadow-[0px_10px_15px_-3px_rgba(0,104,119,0.25),0px_4px_6px_-4px_rgba(0,104,119,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
              type="submit"
            >
              <span>Sign In</span>
              <ArrowRight className="size-4" strokeWidth={2.4} />
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#dfe3e4]" />
          <span className="text-[12px] font-bold uppercase tracking-[1.2px] text-[#6e797c]">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-[#dfe3e4]" />
        </div>

        <div className="mt-6 text-center text-[15px] font-medium text-[#3e494b]">
          <span>Don&apos;t have an account? </span>
          <AuthLink className="font-bold text-[#6a9dd1]" href="/register">
            Create Account
          </AuthLink>
        </div>
      </div>
    </div>
  );
}

function AuthPageFrame({
  actionHref,
  actionLabel,
  children,
}: {
  actionHref: string;
  actionLabel: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6fafb] pt-[var(--site-header-height)] text-[#0f172a]">
      <AuthHeader actionHref={actionHref} actionLabel={actionLabel} />
      <div className="flex min-h-[calc(100vh-var(--site-header-height,86px)-2rem)] flex-col">
        <section className="relative flex flex-1 items-center justify-center px-4 pb-8 pt-6 md:px-6 md:pt-8">
          {children}
        </section>
        <AuthFooter />
      </div>
      <FloatingWhatsAppButton />
    </main>
  );
}

export function RegisterPage() {
  return (
    <AuthPageFrame actionHref="/login" actionLabel="Login">
      <RegisterCard />
    </AuthPageFrame>
  );
}

export function LoginPage() {
  return (
    <AuthPageFrame actionHref="/register" actionLabel="Register/Login">
      <LoginCard />
    </AuthPageFrame>
  );
}
