"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquareText,
  PawPrint,
  SendHorizonal,
} from "lucide-react";
import { SitePage } from "@/components/site-shell";

const whatsappUrl = "http://wa.me/60183814392";
const supportEmail = "support@twotails.com";
const googleMapsSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=Signature+Market+Malaysia+stores";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=4.2105,101.9758&z=5&output=embed";

const inquiryOptions = [
  "General Question",
  "Product Inquiry",
  "Order Support",
  "Partnership Opportunity",
] as const;

function ContactInfoCard({
  accentClassName,
  description,
  href,
  icon,
  underlineDescription = false,
  title,
}: {
  accentClassName: string;
  description: string;
  href: string;
  icon: ReactNode;
  underlineDescription?: boolean;
  title: string;
}) {
  return (
    <a
      className="block min-h-[108px] w-full rounded-[28px] border border-[rgba(189,200,203,0.38)] bg-white px-5 py-4.5 shadow-[0px_10px_18px_rgba(15,23,42,0.14),0px_4px_8px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1 md:min-h-[122px] md:px-6 md:py-5"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex items-center gap-4 md:gap-5">
        <div
          className={`inline-flex size-[50px] shrink-0 items-center justify-center rounded-[18px] ${accentClassName} md:size-[60px]`.trim()}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-[18px] font-bold leading-[1.05] tracking-[-0.03em] text-[#181c1d] md:text-[22px]">
            {title}
          </h3>
          <p
            className={[
              "mt-1 text-[14px] font-medium leading-[1.2] text-[#0a6d83] md:text-[16px]",
              underlineDescription ? "underline underline-offset-4" : "",
            ].join(" ")}
          >
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}

function LocationsMapCard() {
  return (
    <div className="relative h-[474px] overflow-hidden rounded-[24px] bg-[#0f1112] shadow-[0px_4px_4px_rgba(0,0,0,0.2),0px_1px_2px_rgba(0,0,0,0.05)]">
      <iframe
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={googleMapsEmbedUrl}
        title="Signature Market locations map"
      />
      <a
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[rgba(15,17,18,0.82)] px-4 py-2 text-[12px] font-bold text-white shadow-[0px_6px_18px_rgba(15,23,42,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
        href={googleMapsSearchUrl}
        rel="noreferrer"
        target="_blank"
      >
        <span>Open all locations</span>
        <ExternalLink className="size-3.5" strokeWidth={2.2} />
      </a>
      <div className="absolute inset-x-4 bottom-4 rounded-[16px] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.95)] p-[17px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] backdrop-blur-[2px]">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 text-[#0f172a]" strokeWidth={2.2} />
          <div>
            <h3 className="text-[14px] font-bold leading-5 text-[#181c1d]">
              Signature Market
            </h3>
            <p className="mt-1 text-[12px] leading-4 text-[#3e494b]">
              Explore nearby Signature Market stores and map results directly in
              Google Maps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpCenterBanner() {
  return (
    <div className="rounded-[48px] bg-[rgba(112,255,143,0.2)] px-10 py-10 md:px-16 md:py-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[594px]">
          <h2 className="text-[36px] font-extrabold leading-[1] tracking-[-0.04em] text-black">
            Have a quick question?
          </h2>
          <p className="mt-2 text-[16px] leading-6 text-black">
            Our help center is packed with answers about shipping, ingredients, and
            more.
          </p>
        </div>
        <a
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#08a10d] px-8 py-4 text-[16px] font-bold text-white shadow-[0px_4px_4px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
          href={whatsappUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span>WhatsApp Us</span>
          <ArrowUpRight className="size-[18px]" strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [fullName, setFullName] = useState("Winston Woofington");
  const [email, setEmail] = useState("hello@pawsome.com");
  const [inquiryType, setInquiryType] = useState<(typeof inquiryOptions)[number]>(
    inquiryOptions[0],
  );
  const [message, setMessage] = useState("Tell us how we can help your furry friend...");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`[${inquiryType}] Contact from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\n${message}`,
    );

    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <SitePage activeLabel="Contact Us">
      <section className="relative z-10 bg-[#f6fafb] px-4 pb-16 pt-6 md:px-0 md:pb-24 md:pt-8">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="relative text-center">
            <div className="pointer-events-none absolute left-1/2 top-[-48px] hidden -translate-x-1/2 opacity-5 md:block">
              <PawPrint className="size-[120px] text-[#181c1d]" strokeWidth={1.1} />
            </div>
            <h1 className="text-[48px] font-extrabold leading-[1] tracking-[-0.05em] text-[#181c1d] md:text-[60px]">
              Get in Touch
            </h1>
            <p className="mx-auto mt-5 max-w-[672px] text-[18px] leading-7 text-[#3e494b]">
              Whether you have a question about our treats or just want to share a photo
              of your happy pup, we&apos;re all ears.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[1080px] px-0 md:px-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(0,0.88fr)] xl:gap-9">
            <div className="rounded-[24px] border border-[rgba(189,200,203,0.3)] bg-[rgba(240,244,245,0.2)] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.18),0px_1px_2px_rgba(0,0,0,0.05)] md:min-h-[676px] md:p-[40px]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[14px] font-bold leading-5 text-[#181c1d]">
                      Full Name
                    </span>
                    <input
                      className="h-[50px] w-full rounded-[12px] border border-[#bdc8cb] bg-[#f6fafb] px-[17px] text-[16px] text-[#181c1d] outline-none placeholder:text-[rgba(110,121,124,0.5)] focus:border-[#86e6fa]"
                      onChange={(event) => setFullName(event.target.value)}
                      type="text"
                      value={fullName}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[14px] font-bold leading-5 text-[#181c1d]">
                      Email Address
                    </span>
                    <input
                      className="h-[50px] w-full rounded-[12px] border border-[#bdc8cb] bg-[#f6fafb] px-[17px] text-[16px] text-[#181c1d] outline-none placeholder:text-[rgba(110,121,124,0.5)] focus:border-[#86e6fa]"
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      value={email}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[14px] font-bold leading-5 text-[#181c1d]">
                    Inquiry Type
                  </span>
                  <select
                    className="h-[50px] w-full rounded-[12px] border border-[#bdc8cb] bg-[#f6fafb] px-[17px] text-[16px] text-[#181c1d] outline-none focus:border-[#86e6fa]"
                    onChange={(event) =>
                      setInquiryType(event.target.value as (typeof inquiryOptions)[number])
                    }
                    value={inquiryType}
                  >
                    {inquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[14px] font-bold leading-5 text-[#181c1d]">
                    Message
                  </span>
                  <textarea
                    className="h-[174px] w-full rounded-[12px] border border-[#bdc8cb] bg-[#f6fafb] px-[17px] py-[13px] text-[16px] text-[#181c1d] outline-none placeholder:text-[rgba(110,121,124,0.5)] focus:border-[#86e6fa]"
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                  />
                </label>

                <button
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-10 py-4 text-[18px] font-bold leading-7 text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
                  type="submit"
                >
                  <span>Send Message</span>
                  <SendHorizonal className="size-[15px]" strokeWidth={2.4} />
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <ContactInfoCard
                  accentClassName="bg-[#86e6fa]"
                  description={supportEmail}
                  href={`mailto:${supportEmail}`}
                  icon={<Mail className="size-6 text-[#006877] md:size-7" strokeWidth={2.1} />}
                  title="Email Us"
                />
                <ContactInfoCard
                  accentClassName="bg-[#c5e9f1]"
                  description="WhatsApp Chat (Message Only)"
                  href={whatsappUrl}
                  icon={
                    <MessageSquareText className="size-6 text-[#42646b] md:size-7" strokeWidth={2.1} />
                  }
                  underlineDescription
                  title="Chat With Us"
                />
              </div>

              <LocationsMapCard />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[1160px] px-0 md:mt-10 md:px-6">
          <HelpCenterBanner />
        </div>
      </section>
    </SitePage>
  );
}
