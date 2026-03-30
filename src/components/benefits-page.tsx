"use client";
import { useEffect, useRef, useState } from "react";
import {
  benefitsBlendPanels,
  benefitsFeatureCards,
  benefitsIngredients,
  productUrl,
  siteAssets,
} from "@/lib/site-data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { PrimaryButton, SecondaryButton, SitePage } from "@/components/site-shell";

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-center text-[13px] font-bold uppercase tracking-[1.8px] text-[#6a9dd1] md:text-[14px]">
      {children}
    </p>
  );
}

function BenefitCard({ index }: { index: number }) {
  const card = benefitsFeatureCards[index];
  const motionClassNames = [
    "motion-bubble-a",
    "motion-bubble-b",
    "motion-bubble-c",
    "motion-bubble-b",
    "motion-bubble-a",
  ];
  const titleClassName =
    card.title.length > 34
      ? "max-w-[16ch] text-[14px] leading-[1.35] md:text-[17px]"
      : "max-w-[13ch] text-[18px] leading-[1.25] md:text-[21px]";

  return (
    <article
      className={[
        "group flex aspect-square w-[168px] shrink-0 snap-center items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,rgba(220,235,251,0.96)_0%,rgba(238,246,253,0.9)_45%,rgba(255,255,255,0.98)_100%)] p-6 text-center shadow-[0px_8px_20px_rgba(15,23,42,0.16)] transition-shadow duration-300 hover:shadow-[0px_16px_28px_rgba(15,23,42,0.16)] md:w-[178px] md:p-7",
        "animate-fade-up",
        motionClassNames[index] ?? "",
      ].join(" ")}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <h3 className={`font-bold text-[#0f172a] ${titleClassName}`}>
        {card.title}
      </h3>
    </article>
  );
}

function getCenteredBubbleIndex(viewport: HTMLDivElement) {
  const cards = Array.from(
    viewport.querySelectorAll<HTMLElement>("[data-benefits-love-card]"),
  );

  if (!cards.length) {
    return 0;
  }

  const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function BenefitsLoveScroller() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncActiveIndex = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      setActiveIndex(getCenteredBubbleIndex(viewport));
    };

    syncActiveIndex();
    window.addEventListener("resize", syncActiveIndex);

    return () => window.removeEventListener("resize", syncActiveIndex);
  }, []);

  return (
    <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2">
      <div
        ref={viewportRef}
        className="overflow-x-auto overflow-y-visible px-5 py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10 md:py-8 xl:px-14"
        onScroll={() => {
          const viewport = viewportRef.current;
          if (!viewport) {
            return;
          }

          setActiveIndex(getCenteredBubbleIndex(viewport));
        }}
      >
        <div className="flex w-max touch-pan-x snap-x snap-mandatory items-center gap-5 pr-5 md:gap-6 md:pr-10 xl:min-w-full xl:justify-center xl:pr-14">
          {benefitsFeatureCards.map((card, index) => (
            <div key={card.title} data-benefits-love-card>
              <BenefitCard index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {benefitsFeatureCards.map((card, index) => (
          <span
            key={card.title}
            aria-hidden="true"
            className={[
              "inline-flex rounded-full transition-all duration-300",
              index === activeIndex ? "h-2.5 w-6 bg-[#006877]" : "size-2.5 bg-[#bfd5db]",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function RevealRichCopy({
  body,
  delayStartMs = 180,
}: {
  body: ReadonlyArray<{
    highlight?: boolean;
    text: string;
  }>;
  delayStartMs?: number;
}) {
  return (
    <>
      {body.map((segment, index) => (
        <span
          key={`${segment.text}-${segment.highlight ? "highlight" : "base"}-${index}`}
          className={[
            "reveal-stagger-item inline-block align-baseline whitespace-pre-wrap",
            segment.highlight ? "text-[#6a9dd1]" : "",
          ].join(" ")}
          style={{ transitionDelay: `${delayStartMs + index * 85}ms` }}
        >
          {segment.text}
        </span>
      ))}
    </>
  );
}

function IngredientCard({ index }: { index: number }) {
  const ingredient = benefitsIngredients[index];
  const isReversed = index % 2 === 1;

  return (
    <article className="mx-auto w-full max-w-[960px] overflow-hidden rounded-[30px] bg-[rgba(19,154,182,0.1)] shadow-[0px_4px_8px_rgba(15,23,42,0.18)] lg:h-[356px]">
      <div
        className={[
          "grid h-full grid-cols-1",
          isReversed ? "lg:grid-cols-[1fr_410px]" : "lg:grid-cols-[410px_1fr]",
        ].join(" ")}
      >
        <div
          className={[
            "relative h-[280px] overflow-hidden md:h-[340px] lg:h-[356px]",
            isReversed ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <img
            alt={ingredient.title}
            className="h-full w-full object-cover object-center"
            src={ingredient.image}
          />
        </div>

        <div
          className={[
            "flex items-center px-7 py-9 md:px-10 md:py-10 lg:h-[356px]",
            isReversed ? "lg:order-1 lg:pl-[34px] lg:pr-[40px]" : "lg:order-2 lg:pl-[34px] lg:pr-[42px]",
          ].join(" ")}
        >
          <RevealOnScroll
            className="w-full"
            delayMs={index * 140}
            direction={isReversed ? "right" : "left"}
          >
            <div className="w-full max-w-[352px]">
              <h3
                className="reveal-stagger-item text-left text-[34px] leading-none tracking-[-0.02em] text-[#0f172a] md:text-[40px] lg:text-[42px] lg:leading-[36px]"
                style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
              >
                {ingredient.title}
              </h3>
              <p
                className={[
                  "reveal-stagger-item mt-5 text-left text-[16px] leading-[1.68] text-[#475569] md:text-[17px]",
                  isReversed
                    ? "lg:max-w-[352px] lg:text-[18px] lg:leading-[30px]"
                    : "lg:max-w-[352px] lg:text-[18px] lg:leading-[30px]",
                ].join(" ")}
                style={{ fontFamily: "var(--font-body-alt)", transitionDelay: "90ms" }}
              >
                <RevealRichCopy body={ingredient.body} />
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
}

function BlendPanel({ index }: { index: number }) {
  const panel = benefitsBlendPanels[index];
  const isDark = index === 1;
  const mobileImagePosition = isDark ? "object-[78%_center]" : "object-[24%_center]";
  const mobileOverlayClassName = isDark
    ? "bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.58)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0.44)_100%)]";

  return (
    <div
      className={[
        "relative z-10 min-h-[360px] overflow-hidden px-8 py-9 md:px-10 md:py-10 lg:min-h-[851px] lg:px-[72px] lg:py-[92px]",
        isDark
          ? "text-white lg:bg-[rgba(0,0,0,0.36)] lg:backdrop-blur-[2px]"
          : "lg:bg-[linear-gradient(180deg,rgba(255,252,252,0.26),rgba(102,102,102,0.2))] lg:backdrop-blur-[2px]",
      ].join(" ")}
    >
      {/* Mobile panels use their own crop so each caption sits over the intended pet image. */}
      <div className="absolute inset-0 lg:hidden">
        <img
          alt=""
          className={`h-full w-full object-cover ${mobileImagePosition}`}
          src={siteAssets.benefitsBlend}
        />
        <div className={`absolute inset-0 ${mobileOverlayClassName}`} />
      </div>

      <RevealOnScroll
        className="relative z-10 h-full reveal-stagger"
        delayMs={index * 110}
        direction={isDark ? "right" : "left"}
      >
        <span
          className={[
            "reveal-stagger-item inline-flex rounded-[4px] px-3 py-1 text-[12px] font-bold uppercase tracking-[1.2px] shadow-[0px_4px_8px_rgba(15,23,42,0.14)]",
            panel.eyebrowClassName,
          ].join(" ")}
          style={{ transitionDelay: "0ms" }}
        >
          {panel.eyebrow}
        </span>

        <h3
          className={[
            "reveal-stagger-item mt-5 max-w-[11ch] text-[44px] font-extrabold leading-[0.96] tracking-[-0.04em] md:text-[56px] lg:text-[60px]",
            panel.titleClassName,
          ].join(" ")}
          style={{ transitionDelay: "90ms" }}
        >
          {panel.title}
        </h3>

        <ul className="mt-12 space-y-6 lg:mt-24 lg:space-y-[38px]">
          {panel.items.map((item, itemIndex) => (
            <li
              key={item}
              className="reveal-stagger-item flex items-center gap-3"
              style={{ transitionDelay: `${180 + itemIndex * 90}ms` }}
            >
              <img alt="" className="size-5 shrink-0" src={siteAssets.benefitsCheck} />
              <span className={`text-[22px] leading-8 md:text-[24px] ${panel.itemClassName}`}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </div>
  );
}

export function BenefitsPage() {
  return (
    <SitePage activeLabel="Benefits" coverHero>
      <section className="relative z-10 bg-white">
        <div className="site-hero-frame relative mx-auto flex max-w-[1600px] items-center justify-center px-4 pb-12 pt-0 text-center md:px-10 md:pb-16 md:pt-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt="A bowl of freeze-dried duck and tuna bites"
              className="h-full w-full object-cover object-center"
              src={siteAssets.benefitsHero}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.36)_0%,rgba(66,66,66,0.56)_50%,rgba(102,102,102,0.78)_100%)]" />
          </div>

          <div className="relative z-10 flex max-w-[980px] flex-col items-center">
            <span className="inline-flex rounded-full bg-[rgba(141,223,255,0.3)] px-4 py-1 text-[14px] font-bold uppercase tracking-[1.4px] text-[#8ddfff]">
              Two Tails
            </span>
            <h1 className="mt-9 text-[44px] font-bold leading-[0.96] tracking-[-0.05em] text-white md:text-[72px]">
              <span className="italic text-[#8ddfff]">Benefits</span> In Every Bites
            </h1>
            <p className="mt-9 max-w-[42ch] text-[18px] leading-8 text-[#e2e8f0] md:text-[20px]">
              Made with real duck and tuna for dogs and cats who deserve a simple,
              tasty, and thoughtful treat.
            </p>
            <a
              aria-label="Scroll to the Benefits section"
              className="mt-20 inline-flex transition-transform duration-300 hover:translate-y-1"
              href="#benefits-love"
            >
              <img
                alt=""
                className="h-[17px] w-[30px]"
                src={siteAssets.benefitsHeroChevron}
              />
            </a>
          </div>
        </div>
      </section>

      <section
        id="benefits-love"
        className="relative z-20 bg-[#eef8fe] px-4 py-16 md:px-0 md:py-20"
      >
        <RevealOnScroll className="site-shell-inner">
          <div className="reveal-stagger mx-auto max-w-[860px] text-center">
            <div className="reveal-stagger-item" style={{ transitionDelay: "0ms" }}>
              <SectionEyebrow>Parents favourite</SectionEyebrow>
            </div>
            <h2
              className="reveal-stagger-item mt-5 text-[38px] leading-none text-[#0f172a] md:text-[56px]"
              style={{ fontFamily: "var(--font-hero)", transitionDelay: "90ms" }}
            >
              Why Pet Parents Love It
            </h2>
            <p
              className="reveal-stagger-item mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-[#64748b] md:text-[18px]"
              style={{ fontFamily: "var(--font-body-alt)", transitionDelay: "180ms" }}
            >
              More than just a snack, Two Tails Freeze-Dried Duck &amp; Tuna
              Bites are made to bring together taste, quality, and everyday
              convenience in one rewarding bite.
            </p>
          </div>

          <BenefitsLoveScroller />
        </RevealOnScroll>
      </section>

      <section className="relative z-20 bg-white px-4 py-16 md:px-0 md:py-20">
        <div className="site-shell-inner">
          <RevealOnScroll className="reveal-stagger mx-auto max-w-[900px] text-center">
            <div className="reveal-stagger-item" style={{ transitionDelay: "0ms" }}>
              <SectionEyebrow>Best ingredients for your pet</SectionEyebrow>
            </div>
            <h2
              className="reveal-stagger-item mt-5 text-[38px] leading-none text-[#0f172a] md:text-[56px]"
              style={{ fontFamily: "var(--font-hero)", transitionDelay: "90ms" }}
            >
              Simple Ingredients, Real Goodness
            </h2>
            <p
              className="reveal-stagger-item mx-auto mt-5 max-w-[780px] text-[16px] leading-8 text-[#64748b] md:text-[18px]"
              style={{ fontFamily: "var(--font-body-alt)", transitionDelay: "180ms" }}
            >
              We believe what goes into your furkid&apos;s treats matters.
              That&apos;s why every bite starts with real ingredients pet parents
              can feel better about.
            </p>
          </RevealOnScroll>

          <div className="mx-auto mt-12 max-w-[1010px] space-y-8 md:mt-16 md:space-y-[58px]">
            {benefitsIngredients.map((ingredient, index) => (
              <IngredientCard key={ingredient.title} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden bg-white px-0 py-12 md:py-0">
        <div className="relative mx-auto w-full max-w-[1600px] lg:min-h-[851px]">
          <div className="absolute inset-0 hidden lg:block">
            <video
              aria-label="A cat and dog enjoying a bowl of Two Tails bites"
              autoPlay
              className="h-full w-full object-cover object-center"
              loop
              muted
              onCanPlay={(event) => {
                event.currentTarget.defaultMuted = true;
                void event.currentTarget.play().catch(() => {});
              }}
              playsInline
              poster={siteAssets.benefitsBlend}
              preload="auto"
              src={siteAssets.benefitsBlendVideo}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_50%,rgba(0,0,0,0.12)_100%)]" />
          </div>
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/35 lg:block" />

          <div className="relative grid lg:min-h-[851px] lg:grid-cols-2">
            {benefitsBlendPanels.map((panel, index) => (
              <BlendPanel key={panel.title} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-white px-4 pb-14 pt-12 md:px-0 md:pb-20 md:pt-16">
        <RevealOnScroll className="site-shell-inner">
          <div className="mx-auto max-w-[1052px] overflow-hidden rounded-[24px] bg-[rgba(13,133,255,0.1)] shadow-[0px_8px_18px_rgba(15,23,42,0.12)]">
            <div className="bg-[linear-gradient(161deg,rgba(141,223,255,0.3)_0%,rgba(141,223,255,0)_100%)] px-6 py-12 md:px-14 md:py-[72px]">
              <div className="reveal-stagger mx-auto max-w-[780px] text-center">
                <h2
                  className="reveal-stagger-item text-[38px] leading-none text-black md:text-[48px]"
                  style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
                >
                  Treat Them to Something Better
                </h2>
                <p
                  className="reveal-stagger-item mx-auto mt-6 max-w-[38ch] text-[16px] leading-7 text-[#111] md:text-[18px]"
                  style={{ fontFamily: "var(--font-body-alt)", transitionDelay: "90ms" }}
                >
                  Real duck, real tuna, and freeze-dried goodness in every bite for
                  dogs and cats.
                </p>
                <div
                  className="reveal-stagger-item mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8"
                  style={{ transitionDelay: "180ms" }}
                >
                  <PrimaryButton
                    className="w-full max-w-[300px] px-8 py-4 text-[16px] leading-6"
                    href={productUrl}
                  >
                    Buy Now
                  </PrimaryButton>
                  <SecondaryButton
                    className="w-full max-w-[300px] px-8 py-4 text-[16px] leading-6"
                    href="/feeding-guide"
                  >
                    View Feeding Guide
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </SitePage>
  );
}
