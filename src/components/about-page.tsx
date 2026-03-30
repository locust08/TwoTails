"use client";

import { Check, CheckCircle2, PawPrint } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { aboutHighlights, aboutIngredients, productUrl, siteAssets } from "@/lib/site-data";
import { PrimaryButton, SecondaryButton, SitePage } from "@/components/site-shell";

function HighlightBubble({
  bubbleClassName,
  bubbleStyle,
  className,
  description,
  title,
}: {
  bubbleClassName?: string;
  bubbleStyle?: CSSProperties;
  className?: string;
  description: string;
  title: string;
}) {
  return (
    <div className={bubbleClassName} style={bubbleStyle}>
      <article
        className={[
          "aspect-square rounded-full bg-[radial-gradient(circle_at_top,#dcebfb_0%,#eef6fd_45%,#fdfefe_100%)] p-8 text-center shadow-[0px_8px_20px_rgba(15,23,42,0.16)] transition-shadow duration-500 hover:shadow-[0px_14px_28px_rgba(15,23,42,0.18)]",
          className ?? "",
        ].join(" ")}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h3
            className="max-w-[13ch] text-[19px] leading-[1.15] text-[#0f172a] md:text-[22px]"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {title}
          </h3>
          <p className="max-w-[18ch] text-[13px] leading-6 text-[#475569] md:text-[14px]">
            {description}
          </p>
        </div>
      </article>
    </div>
  );
}

function MobileFreezeBubbleCluster() {
  const mobileHighlights = [
    {
      ...aboutHighlights[0],
      buttonClassName:
        "left-[2px] top-[44px] motion-bubble-a sm:left-[10px] sm:top-[38px]",
      detailClassName:
        "left-[108px] top-[38px] origin-left-top sm:left-[126px] sm:top-[34px]",
      label: "Raw Frozen Freshness",
    },
    {
      ...aboutHighlights[2],
      buttonClassName:
        "right-[2px] top-[134px] motion-bubble-c sm:right-[10px] sm:top-[124px]",
      detailClassName:
        "right-[108px] top-[128px] origin-right-center sm:right-[126px] sm:top-[118px]",
      label: "Crunchy, Convenient Bites",
    },
    {
      ...aboutHighlights[1],
      buttonClassName:
        "left-[12px] bottom-[78px] motion-bubble-b sm:left-[22px] sm:bottom-[72px]",
      detailClassName:
        "left-[118px] bottom-[72px] origin-left-bottom sm:left-[136px] sm:bottom-[66px]",
      label: "Nutrient-Rich Rewards",
    },
  ] as const;
  const [activeTitle, setActiveTitle] = useState<string | null>(null);

  return (
    <div className="reveal-stagger relative mx-auto mt-14 block h-[430px] w-full max-w-[340px] lg:hidden">
      <div
        className="reveal-stagger-item absolute left-1/2 top-[84px] z-10 w-[210px] -translate-x-1/2 drop-shadow-[0_14px_22px_rgba(15,23,42,0.25)] sm:top-[72px] sm:w-[236px]"
        style={{ transitionDelay: "0ms" }}
      >
        <img
          alt="A stack of freeze-dried Two Tails bites"
          className="w-full"
          src={siteAssets.aboutFreezeStack}
          style={{ animation: "float-soft 5.5s ease-in-out infinite" }}
        />
      </div>

      {mobileHighlights.map((highlight, index) => {
        const isActive = activeTitle === highlight.title;

        return (
          <div key={highlight.title}>
            <button
              aria-expanded={isActive}
              className={[
                "reveal-stagger-item absolute z-20 flex aspect-square w-[96px] items-center justify-center rounded-full border border-white/65 bg-[radial-gradient(circle_at_top,#dcebfb_0%,#eef6fd_58%,#fdfefe_100%)] p-4 text-center shadow-[0px_10px_22px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5 sm:w-[104px]",
                highlight.buttonClassName,
                isActive
                  ? "ring-2 ring-[#8bc3ff] ring-offset-2 ring-offset-[#eef8fe]"
                  : "",
              ].join(" ")}
              onClick={() =>
                setActiveTitle((current) =>
                  current === highlight.title ? null : highlight.title,
                )
              }
              style={{ transitionDelay: `${120 + index * 100}ms` }}
              type="button"
            >
              <span
                className="text-[12px] font-bold leading-[1.2] text-[#0f172a] sm:text-[12.5px]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {highlight.label}
              </span>
            </button>

            {isActive ? (
              <div
                className={[
                  "absolute z-30 w-[198px] rounded-[28px] bg-[radial-gradient(circle_at_top,#dcebfb_0%,#eef6fd_45%,#ffffff_100%)] px-5 py-4 text-left shadow-[0px_16px_28px_rgba(15,23,42,0.18)] transition duration-300",
                  highlight.detailClassName,
                ].join(" ")}
              >
                <p
                  className="text-[15px] leading-[1.15] text-[#0f172a]"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {highlight.title}
                </p>
                <p className="mt-2 text-[12px] leading-5 text-[#475569]">
                  {highlight.description}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function FreezeDryingBubbles() {
  return (
    <>
      <MobileFreezeBubbleCluster />

      <div className="reveal-stagger relative mt-16 hidden min-h-[900px] lg:block">
        <div
          className="reveal-stagger-item absolute left-[18px] top-[100px] w-[232px]"
          style={{ transitionDelay: "0ms" }}
        >
          <HighlightBubble
            className="w-full"
            bubbleStyle={{ animation: "bubble-a 6.8s ease-in-out infinite" }}
            description={aboutHighlights[0].description}
            title={aboutHighlights[0].title}
          />
        </div>

        <div
          className="reveal-stagger-item absolute left-[28px] top-[560px] w-[248px]"
          style={{ transitionDelay: "180ms" }}
        >
          <HighlightBubble
            className="w-full"
            bubbleStyle={{ animation: "bubble-b 7.6s ease-in-out infinite" }}
            description={aboutHighlights[1].description}
            title={aboutHighlights[1].title}
          />
        </div>

        <div
          className="reveal-stagger-item absolute left-1/2 top-[34px] w-[540px] -translate-x-1/2"
          style={{ transitionDelay: "90ms" }}
        >
          <img
            alt="A stack of freeze-dried Two Tails bites"
            className="w-full drop-shadow-[0_14px_22px_rgba(15,23,42,0.25)]"
            src={siteAssets.aboutFreezeStack}
            style={{ animation: "float-soft 5.5s ease-in-out infinite" }}
          />
        </div>

        <div
          className="reveal-stagger-item absolute right-[74px] top-[362px] w-[232px]"
          style={{ transitionDelay: "270ms" }}
        >
          <HighlightBubble
            className="w-full"
            bubbleStyle={{ animation: "bubble-c 7.1s ease-in-out infinite" }}
            description={aboutHighlights[2].description}
            title={aboutHighlights[2].title}
          />
        </div>
      </div>
    </>
  );
}

export function AboutPage() {
  return (
    <SitePage activeLabel="About" coverHero>
      <section className="relative z-10 bg-white">
        <div
          className="site-hero-frame relative mx-auto flex w-full max-w-none items-center overflow-hidden px-4 py-0 md:px-0 md:py-0"
          style={{ minHeight: "calc(100dvh - var(--site-header-height, 86px))" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt="A cat and a dog resting behind the About page hero heading"
              className="h-full w-full object-cover object-[64%_center] md:object-[58%_center]"
              src={siteAssets.aboutHero}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0f172a_0%,rgba(15,23,42,0.86)_34%,rgba(15,23,42,0.34)_62%,rgba(15,23,42,0.05)_100%)]" />
          </div>

          <div className="relative z-10 max-w-[580px] px-2 py-4 text-white md:ml-14 md:max-w-[640px] md:px-0 md:py-8">
            <div className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-[#b2eadf] px-3 py-1 text-[13px] font-bold text-[#065f46] md:text-[14px]">
              <CheckCircle2 className="size-4" strokeWidth={2.25} />
              <span>For Dogs &amp; Cats</span>
            </div>
            <h1 className="mt-5 max-w-[10ch] animate-fade-up text-[40px] font-bold leading-[0.96] tracking-[-0.03em] text-white md:mt-6 md:text-[60px]">
              Wholesome Goodness For Every Tail
            </h1>
            <p className="mt-5 max-w-[28ch] animate-fade-up text-[17px] leading-7 text-white/90 [animation-delay:120ms] md:mt-6 md:max-w-[30ch] md:text-[20px] md:leading-8">
              Two Tails creates pet food you can trust, with the care and quality
              your furry family deserves. Because they&apos;re not just pets,
              they&apos;re family.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-white px-4 py-12 md:px-0 md:py-16">
        <RevealOnScroll className="site-shell-inner">
          <div className="relative overflow-hidden rounded-[28px] bg-[#eef8fe] px-6 pb-10 pt-12 shadow-[0px_4px_18px_rgba(0,0,0,0.18)] md:px-10 md:pb-14 md:pt-12">
            <PawPrint className="absolute left-6 top-1/2 size-16 -translate-y-1/2 rotate-[-22deg] text-slate-300/45" strokeWidth={1.2} />
            <PawPrint className="absolute right-12 top-28 size-[4.5rem] rotate-[16deg] text-slate-300/45" strokeWidth={1.2} />
            <PawPrint className="absolute bottom-14 right-24 size-16 text-slate-300/45" strokeWidth={1.2} />

            <div className="mx-auto max-w-[860px] text-center">
              <p className="text-[13px] font-bold uppercase tracking-[1.8px] text-[#6a9dd1] md:text-[14px]">
                Raw goodness, preserved with care.
              </p>
              <h2
                className="mt-5 text-[36px] leading-none text-[#0f172a] md:text-[64px]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                The Magic of Freeze-Drying
              </h2>
              <p
                className="mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-[#475569] md:text-[18px]"
                style={{ fontFamily: "var(--font-body-alt)" }}
              >
                Made from{" "}
                <span className="text-[#6a9dd1]">100% raw freeze-dried duck meat</span>{" "}
                and <span className="text-[#6a9dd1]">tuna</span> for a tasty,
                nourishing bite pets love.
              </p>
            </div>

            <FreezeDryingBubbles />
          </div>
        </RevealOnScroll>
      </section>

      <section className="relative z-20 bg-white px-4 py-12 md:px-0 md:py-20">
        <RevealOnScroll className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[13px] font-bold uppercase tracking-[1.8px] text-[#6a9dd1] md:text-[14px]">
              Only what matters, nothing extra
            </p>
            <h2
              className="mt-5 text-[34px] leading-none text-[#0f172a] md:text-[52px]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              Simple, Premium Ingredients
            </h2>
            <p
              className="mx-auto mt-5 max-w-[960px] text-[16px] leading-8 text-[#475569] md:text-[18px]"
              style={{ fontFamily: "var(--font-body-alt)" }}
            >
              We believe that what&apos;s NOT in our food is just as important as
              what is. No fillers, no artificial preservatives, and no mystery
              meats. Just honest ingredients you&apos;d find at a gourmet market.
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 lg:grid-cols-2">
            <PawPrint className="pointer-events-none absolute bottom-[-18px] right-0 hidden size-16 text-slate-300/45 lg:block" strokeWidth={1.2} />

            {aboutIngredients.map((ingredient, index) => (
              <article
                key={ingredient.title}
                className="group reveal-stagger-item"
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="relative overflow-hidden rounded-[32px] shadow-[0px_20px_40px_rgba(15,23,42,0.18)]">
                  <img
                    alt={ingredient.title}
                    className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[396px]"
                    src={ingredient.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/24 to-transparent" />
                  <h3
                    className="absolute bottom-8 left-8 text-[28px] text-white md:text-[30px]"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    {ingredient.title}
                  </h3>
                </div>

                <div className="mt-5 flex items-start gap-3 px-1">
                  <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#63c7ff] text-[#63c7ff]">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <h4 className="text-[18px] font-bold leading-7 text-[#0f172a]">
                      {ingredient.title}
                    </h4>
                    <p className="mt-1 text-[15px] leading-7 text-[#64748b] md:text-[16px]">
                      {ingredient.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <section className="relative z-20 border-y border-[rgba(15,23,42,0.08)] bg-[#eef8fe] shadow-[0px_4px_4px_rgba(0,0,0,0.18)]">
        <RevealOnScroll className="site-shell-inner py-16 md:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <h2
              className="text-[34px] leading-none text-[#3f3e3e] md:text-[48px]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              Ready to upgrade your pet&apos;s bowl?
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <PrimaryButton
                className="w-full max-w-[300px] px-8 py-4 text-[16px] leading-6 md:w-[300px]"
                href={productUrl}
              >
                Upgrade Now
              </PrimaryButton>
              <SecondaryButton
                className="w-full max-w-[300px] border-transparent px-8 py-4 text-[16px] leading-6 md:w-[300px]"
                href="/benefits"
              >
                Learn More Benefits
              </SecondaryButton>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </SitePage>
  );
}
