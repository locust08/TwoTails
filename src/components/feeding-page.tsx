"use client";

import { useEffect, useRef, useState } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import {
  feedingEnjoyCards,
  feedingFaqs,
  feedingPreparationTips,
  feedingRoutineSizes,
  feedingStorageTips,
  feedingSuitableTags,
  feedingTips,
  productUrl,
  siteAssets,
} from "@/lib/site-data";
import { PrimaryButton, SecondaryButton, SitePage } from "@/components/site-shell";

const ENJOY_CARD_SELECTOR = "[data-enjoy-card]";
const ROUTINE_SIZE_SELECTOR = "[data-routine-size-card]";
const FAQ_CARD_SELECTOR = "[data-faq-card]";
const ENJOY_AUTOPLAY_MS = 10000;

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-[13px] font-bold uppercase tracking-[1.6px] text-[#006776] md:text-[14px]">
      {children}
    </p>
  );
}

function EnjoyCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: string;
  title: string;
}) {
  return (
    <article className="flex h-full min-h-[212px] flex-col rounded-[20px] border border-[rgba(189,200,203,0.3)] bg-white p-6 shadow-[0px_6px_16px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1 md:min-h-[228px]">
      <img alt="" className="h-5 w-5" src={icon} />
      <div className="reveal-stagger">
        <h3
          className="reveal-stagger-item mt-5 text-[21px] font-bold leading-8 text-[#181c1d]"
          style={{ transitionDelay: "0ms" }}
        >
          {title}
        </h3>
        <p
          className="reveal-stagger-item mt-3 text-[16px] leading-7 text-[#52606b]"
          style={{ transitionDelay: "90ms" }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function getCenteredItemIndex(viewport: HTMLDivElement, selector: string) {
  const items = Array.from(viewport.querySelectorAll<HTMLElement>(selector));

  if (!items.length) {
    return 0;
  }

  const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item, index) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const distance = Math.abs(itemCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function scrollToItemIndex(
  viewport: HTMLDivElement,
  index: number,
  selector: string,
  behavior: ScrollBehavior = "smooth",
) {
  const items = Array.from(viewport.querySelectorAll<HTMLElement>(selector));
  const target = items[index];

  if (!target) {
    return;
  }

  const left = Math.max(0, target.offsetLeft - (viewport.clientWidth - target.offsetWidth) / 2);
  viewport.scrollTo({ left, behavior });
}

function CarouselDots({
  activeIndex,
  count,
}: {
  activeIndex: number;
  count: number;
}) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={[
            "inline-flex rounded-full transition-all duration-300",
            index === activeIndex ? "h-2.5 w-6 bg-[#006877]" : "size-2.5 bg-[#bfd5db]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function EnjoyCardsScroller() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncActiveIndex = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      setActiveIndex(getCenteredItemIndex(viewport, ENJOY_CARD_SELECTOR));
    };

    syncActiveIndex();
    window.addEventListener("resize", syncActiveIndex);

    return () => window.removeEventListener("resize", syncActiveIndex);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const nextIndex =
        (getCenteredItemIndex(viewport, ENJOY_CARD_SELECTOR) + 1) %
        feedingEnjoyCards.length;

      scrollToItemIndex(viewport, nextIndex, ENJOY_CARD_SELECTOR);
      setActiveIndex(nextIndex);
    }, ENJOY_AUTOPLAY_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 px-4 md:px-8 xl:hidden">
        <div
          ref={viewportRef}
          className="overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => {
            const viewport = viewportRef.current;
            if (!viewport) {
              return;
            }

            setActiveIndex(getCenteredItemIndex(viewport, ENJOY_CARD_SELECTOR));
          }}
        >
          <div className="mx-auto flex w-max touch-pan-x snap-x snap-mandatory gap-5 pr-1 md:gap-6">
            {feedingEnjoyCards.map((card, index) => (
              <div
                key={card.title}
                data-enjoy-card
                className="w-[min(84vw,20rem)] shrink-0 snap-center sm:w-[min(62vw,21rem)] lg:w-[min(42vw,22rem)]"
              >
                <RevealOnScroll className="h-full" delayMs={index * 90}>
                  <EnjoyCard
                    description={card.description}
                    icon={card.icon}
                    title={card.title}
                  />
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>

        <CarouselDots activeIndex={activeIndex} count={feedingEnjoyCards.length} />
      </div>

      <div className="mt-10 hidden grid-cols-2 gap-5 xl:grid">
        {feedingEnjoyCards.map((card, index) => (
          <RevealOnScroll key={card.title} className="h-full" delayMs={index * 90}>
            <EnjoyCard
              description={card.description}
              icon={card.icon}
              title={card.title}
            />
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}

function RoutineSizesScroller() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncActiveIndex = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      setActiveIndex(getCenteredItemIndex(viewport, ROUTINE_SIZE_SELECTOR));
    };

    syncActiveIndex();
    window.addEventListener("resize", syncActiveIndex);

    return () => window.removeEventListener("resize", syncActiveIndex);
  }, []);

  return (
    <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-visible pb-[calc(1rem+0.5cm)] pt-[1.25rem]">
      <div className="overflow-visible px-4 md:px-8 xl:px-10">
        <div
          ref={viewportRef}
          className="overflow-x-auto overflow-y-visible pb-4 md:pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => {
            const viewport = viewportRef.current;
            if (!viewport) {
              return;
            }

            setActiveIndex(getCenteredItemIndex(viewport, ROUTINE_SIZE_SELECTOR));
          }}
        >
          <div className="mx-auto flex w-max touch-pan-x snap-x snap-mandatory gap-[1cm] pr-4 pt-4 md:pr-8 xl:pr-10">
          {feedingRoutineSizes.map((item, index) => (
            <div
              key={item.title}
              data-routine-size-card
              className="w-[min(84vw,21rem)] shrink-0 snap-center overflow-visible sm:w-[min(64vw,22rem)] lg:w-[min(38vw,24rem)] xl:w-[calc((100vw-2cm-5rem)/3)] xl:max-w-[28rem]"
            >
              <RevealOnScroll className="h-full overflow-visible" delayMs={index * 100}>
                <RoutineCard
                  dailyPieces={item.dailyPieces}
                  image={item.image}
                  recommended={"recommended" in item ? item.recommended : undefined}
                  subtitle={item.subtitle}
                  title={item.title}
                />
              </RevealOnScroll>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div className="xl:hidden">
        <CarouselDots activeIndex={activeIndex} count={feedingRoutineSizes.length} />
      </div>
    </div>
  );
}

function FaqCardsScroller() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncActiveIndex = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      setActiveIndex(getCenteredItemIndex(viewport, FAQ_CARD_SELECTOR));
    };

    syncActiveIndex();
    window.addEventListener("resize", syncActiveIndex);

    return () => window.removeEventListener("resize", syncActiveIndex);
  }, []);

  return (
    <>
      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-4 md:hidden">
        <div
          ref={viewportRef}
          className="overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => {
            const viewport = viewportRef.current;
            if (!viewport) {
              return;
            }

            setActiveIndex(getCenteredItemIndex(viewport, FAQ_CARD_SELECTOR));
          }}
        >
          <div className="mx-auto flex w-max touch-pan-x snap-x snap-mandatory gap-5 pr-1">
            {feedingFaqs.map((faq, index) => (
              <div
                key={faq.question}
                data-faq-card
                className="w-[min(88vw,22rem)] shrink-0 snap-center"
              >
                <RevealOnScroll className="h-full" delayMs={index * 70}>
                  <FaqFlipCard
                    answer={faq.answer}
                    icon={faq.icon}
                    question={faq.question}
                  />
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>

        <CarouselDots activeIndex={activeIndex} count={feedingFaqs.length} />
      </div>

      <div className="mt-12 hidden auto-rows-fr gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
        {feedingFaqs.map((faq, index) => (
          <RevealOnScroll key={faq.question} delayMs={index * 70}>
            <FaqFlipCard answer={faq.answer} icon={faq.icon} question={faq.question} />
          </RevealOnScroll>
        ))}
      </div>
    </>
  );
}

function RoutineCard({
  dailyPieces,
  image,
  recommended,
  subtitle,
  title,
}: {
  dailyPieces: string;
  image: string;
  recommended?: boolean;
  subtitle: string;
  title: string;
}) {
  return (
    <article
      className={[
        "relative rounded-[32px] border bg-white px-8 pb-8 pt-9 text-center shadow-[0px_8px_18px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1",
        recommended
          ? "z-10 border-[#6a9dd1] shadow-[0px_18px_30px_rgba(106,157,209,0.18)]"
          : "border-[rgba(189,200,203,0.35)]",
      ].join(" ")}
    >
      {recommended ? (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6a9dd1] px-4 py-1 text-[10px] font-bold uppercase tracking-[1px] text-white">
          Recommended
        </span>
      ) : null}

      <div className="mx-auto flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#f6fafb] bg-[#12343f] shadow-[0px_8px_14px_rgba(15,23,42,0.18)]">
        <img alt="" className="h-full w-full object-cover" src={image} />
      </div>

      <div className="reveal-stagger">
        <h3
          className="reveal-stagger-item mt-6 text-[20px] font-bold leading-7 text-[#181c1d]"
          style={{ transitionDelay: "0ms" }}
        >
          {title}
        </h3>
        <p
          className="reveal-stagger-item mt-2 text-[12px] font-semibold uppercase tracking-[0.4px] text-[#6a9dd1]"
          style={{ transitionDelay: "90ms" }}
        >
          {subtitle}
        </p>

        <div
          className="reveal-stagger-item mt-6 rounded-[18px] bg-[#f6fafb] px-6 py-5"
          style={{ transitionDelay: "180ms" }}
        >
          <p className="text-[42px] font-extrabold leading-none text-[#6a9dd1]">{dailyPieces}</p>
          <p className="mt-2 text-[14px] font-bold uppercase text-[#3e494b]">Pieces Daily</p>
        </div>
      </div>
    </article>
  );
}

function PreparationCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <img alt="" className="mt-1 h-[27px] w-[27px] shrink-0" src={icon} />
      <div className="reveal-stagger">
        <h4
          className="reveal-stagger-item text-[22px] font-bold leading-8 text-[#181c1d]"
          style={{ transitionDelay: "0ms" }}
        >
          {title}
        </h4>
        <p
          className="reveal-stagger-item mt-1 text-[15px] leading-7 text-[#52606b]"
          style={{ transitionDelay: "90ms" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function TipPill({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] border border-[rgba(189,200,203,0.25)] bg-white px-4 py-4 shadow-[0px_4px_12px_rgba(15,23,42,0.1)] transition-transform duration-300 hover:-translate-y-0.5">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(106,157,209,0.12)] shadow-[0px_6px_12px_rgba(15,23,42,0.08)]">
        <img alt="" className="h-5 w-5 object-contain" src={icon} />
      </span>
      <p
        className="reveal-stagger-item text-[14px] font-medium leading-5 text-[#181c1d]"
        style={{ transitionDelay: "0ms" }}
      >
        {text}
      </p>
    </div>
  );
}

function FaqFlipCard({
  answer,
  icon,
  question,
}: {
  answer: string;
  icon: string;
  question: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const flipped = hovered || pinned;

  return (
    <button
      className="group block h-full w-full cursor-pointer text-left [perspective:1600px]"
      onBlur={() => setHovered(false)}
      onClick={() => setPinned((value) => !value)}
      onFocus={() => setHovered(true)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      type="button"
    >
      <span
        className={[
          "relative block min-h-[360px] rounded-[18px] transition-transform duration-700 md:min-h-[390px] [transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)]" : "",
        ].join(" ")}
      >
        <span className="absolute inset-0 flex flex-col items-start rounded-[18px] border border-[rgba(189,200,203,0.3)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(217,241,249,0.94)_100%)] px-7 py-8 text-left shadow-[0px_6px_16px_rgba(15,23,42,0.12)] [backface-visibility:hidden] md:px-8 md:py-8">
          <img alt="" className="h-6 w-auto object-contain" src={icon} />
          <div className="reveal-stagger">
            <h3
              className="reveal-stagger-item mt-6 text-[21px] font-bold leading-8 text-[#006877] md:text-[23px]"
              style={{ transitionDelay: "0ms" }}
            >
              {question}
            </h3>
          </div>
        </span>

        <span className="absolute inset-0 rounded-[18px] border border-[rgba(189,200,203,0.3)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(217,241,249,0.96)_100%)] px-7 py-8 text-left shadow-[0px_6px_16px_rgba(15,23,42,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)] md:px-8">
          <img alt="" className="h-6 w-auto object-contain" src={icon} />
          <div className="reveal-stagger">
            <h3
              className="reveal-stagger-item mt-6 text-[18px] font-bold leading-7 text-[#006877]"
              style={{ transitionDelay: "0ms" }}
            >
              {question}
            </h3>
            <p
              className="reveal-stagger-item mt-4 text-[15px] leading-7 text-[#3e494b] md:text-[16px] md:leading-8"
              style={{ transitionDelay: "90ms" }}
            >
              {answer}
            </p>
          </div>
        </span>
      </span>
    </button>
  );
}

export function FeedingPage() {
  return (
    <SitePage activeLabel="Feeding Guide" coverHero>
      <section className="relative z-10 bg-white">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-b-[72px] md:rounded-b-[96px]">
          <div className="site-hero-frame relative flex items-center px-4 pb-12 pt-0 md:px-12 md:pb-16 md:pt-0 lg:px-16">
            <div className="absolute inset-0">
              <img
                alt="Two Tails feeding guide hero with a dog and cat"
                className="h-full w-full object-cover object-center"
                src={siteAssets.feedingHero}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,46,59,0.88)_0%,rgba(13,46,59,0.62)_36%,rgba(13,46,59,0.18)_72%,rgba(13,46,59,0.1)_100%)]" />
            </div>

            <div className="relative z-10 max-w-[620px] text-white">
              <div className="inline-flex animate-fade-up items-center rounded-full bg-[#86e6fa] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.6px] text-[#006776]">
                Guide &amp; FAQ
              </div>
              <h1 className="mt-8 animate-fade-up text-[48px] font-black leading-[0.95] tracking-[-0.05em] md:text-[72px]">
                Feeding Guide
                <br />
                <span className="text-[#43e7ff]">&amp; FAQ</span>
              </h1>
              <p className="mt-6 animate-fade-up text-[20px] font-medium leading-8 [animation-delay:120ms]">
                Everything you need to know before treating your dog or cat.
              </p>
              <p className="mt-5 max-w-[31ch] animate-fade-up text-[17px] leading-8 text-white/80 [animation-delay:220ms] md:text-[18px]">
                Two Tails Freeze-Dried Duck &amp; Tuna Bites are crafted to be the
                ultimate reward for your furry companions, thoughtfully formulated
                for all life stages and sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-[#f6fafb] px-4 py-16 md:px-0 md:py-24">
        <div className="site-shell-inner grid items-center gap-12 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16">
          <RevealOnScroll className="relative">
            <div className="overflow-hidden rounded-[28px] shadow-[0px_18px_30px_rgba(15,23,42,0.14)]">
              <video
                aria-label="A dog being rewarded with a Two Tails bite"
                autoPlay
                className="h-[440px] w-full object-cover object-center md:h-[500px]"
                loop
                muted
                playsInline
                src={siteAssets.feedingEnjoyVideo}
              />
            </div>
            <div className="absolute bottom-[-18px] right-[-8px] max-w-[256px] rounded-[18px] bg-[rgba(255,255,255,0.74)] px-5 py-5 shadow-[0px_12px_24px_rgba(15,23,42,0.14)] backdrop-blur-[8px]">
              <img alt="" className="h-[25px] w-[130px]" src={siteAssets.feedingEnjoyStars} />
              <p className="mt-3 text-[14px] font-semibold leading-6 text-[#006877]">
                &quot;The perfect size for training and quick rewards during our daily
                walks.&quot;
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="max-w-[560px]" delayMs={80}>
            <div className="reveal-stagger">
              <h2
                className="reveal-stagger-item text-[38px] leading-none text-[#181c1d] md:text-[56px]"
                style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
              >
                How to Enjoy These Bites
              </h2>
              <p
                className="reveal-stagger-item mt-6 text-[18px] leading-8 text-[#3e494b]"
                style={{ transitionDelay: "90ms" }}
              >
                Our bites are designed as bite-sized rewards that pack a punch of
                flavor and nutrition. They are versatile, clean to handle, and loved
                by pets of all temperaments.
              </p>
            </div>

            <EnjoyCardsScroller />
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative z-20 bg-[#eefbff] px-4 py-16 md:px-0 md:py-24">
        <div className="site-shell-inner">
          <RevealOnScroll className="text-center">
            <div className="reveal-stagger">
              <h2
                className="reveal-stagger-item text-[38px] leading-none text-[#181c1d] md:text-[56px]"
                style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
              >
                The Feeding Routine
              </h2>
              <p
                className="reveal-stagger-item mx-auto mt-5 max-w-[38ch] text-[18px] leading-8 text-[#3e494b]"
                style={{ transitionDelay: "90ms" }}
              >
                A simple, step-by-step guide to serving Two Tails safely and effectively.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-14">
            <RevealOnScroll className="flex items-center gap-4 reveal-stagger">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#6a9dd1] text-[20px] font-bold text-white">
                1
              </span>
              <h3
                className="reveal-stagger-item text-[30px] font-bold leading-9 text-[#181c1d]"
                style={{ transitionDelay: "0ms" }}
              >
                Choose Your Size
              </h3>
            </RevealOnScroll>

            <RoutineSizesScroller />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <RevealOnScroll className="lg:self-start">
              <div className="reveal-stagger flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#6a9dd1] text-[20px] font-bold text-white">
                  2
                </span>
                <h3
                  className="reveal-stagger-item text-[30px] font-bold leading-9 text-[#181c1d]"
                  style={{ transitionDelay: "0ms" }}
                >
                  Prepare the Treat
                </h3>
              </div>

              <div className="mt-8 rounded-[24px] border border-[rgba(189,200,203,0.2)] bg-white p-8 shadow-[0px_8px_18px_rgba(15,23,42,0.1)]">
                <div className="space-y-8">
                  {feedingPreparationTips.map((tip, index) => (
                    <RevealOnScroll key={tip.title} delayMs={index * 110}>
                      <PreparationCard
                        description={tip.description}
                        icon={tip.icon}
                        title={tip.title}
                      />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="lg:self-start" delayMs={90}>
              <div className="reveal-stagger flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#6a9dd1] text-[20px] font-bold text-white">
                  3
                </span>
                <h3
                  className="reveal-stagger-item text-[30px] font-bold leading-9 text-[#181c1d]"
                  style={{ transitionDelay: "0ms" }}
                >
                  Feeding Tips
                </h3>
              </div>

              <div className="mt-8 space-y-4">
                {feedingTips.map((tip, index) => (
                  <RevealOnScroll key={tip.text} delayMs={index * 100}>
                    <TipPill icon={tip.icon} text={tip.text} />
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            className="mx-auto mt-16 max-w-[768px] rounded-[16px] border border-[rgba(106,157,209,0.2)] bg-[rgba(106,157,209,0.05)] px-6 py-6 text-center shadow-[0px_8px_18px_rgba(15,23,42,0.1)]"
            delayMs={120}
          >
            <p className="text-[12px] leading-[1.65] text-[#3e494b]">
              Two Tails Freeze-Dried Duck &amp; Tuna Bites are intended for{" "}
              <span className="font-bold">intermittent or supplemental feeding only</span>.
              Consult your veterinarian for specific dietary needs related to your
              pet&apos;s health condition.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative z-20 bg-white px-4 py-16 md:px-0 md:py-24">
        <div className="site-shell-inner">
          <div className="overflow-hidden rounded-[40px] bg-[rgba(197,233,241,0.3)] shadow-[0px_8px_18px_rgba(15,23,42,0.12)] xl:grid xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <RevealOnScroll
              className="order-2 px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:order-1"
            >
              <div className="reveal-stagger">
                <div className="reveal-stagger-item" style={{ transitionDelay: "0ms" }}>
                  <SectionEyebrow>Who It&apos;s For</SectionEyebrow>
                </div>
                <h2
                  className="reveal-stagger-item mt-5 text-[38px] leading-none text-[#181c1d] md:text-[56px]"
                  style={{ fontFamily: "var(--font-hero)", transitionDelay: "90ms" }}
                >
                  Suitable for
                  <br />
                  Dogs &amp; Cats
                </h2>
                <p
                  className="reveal-stagger-item mt-6 max-w-[30ch] text-[18px] leading-8 text-[#3e494b]"
                  style={{ transitionDelay: "180ms" }}
                >
                  No more buying separate treats for your feline and canine family
                  members. Two Tails provides a high-quality protein source that both
                  species crave instinctively.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 md:gap-x-6">
                {feedingSuitableTags.map((tag) => (
                  <span
                    key={tag}
                    className="reveal-stagger-item inline-flex min-w-[200px] items-center justify-center rounded-full bg-white px-6 py-2 text-[14px] font-semibold text-[#42646b] shadow-[0px_4px_10px_rgba(15,23,42,0.12)]"
                    style={{ transitionDelay: "270ms" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="order-1 min-h-[320px] xl:order-2 xl:min-h-full" delayMs={80}>
              <img
                alt="A dog and cat sitting together"
                className="h-full w-full object-cover object-center"
                src={siteAssets.feedingSuitablePhoto}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="relative z-20 bg-[#eefbff] px-4 py-16 md:px-0 md:py-24">
        <div className="site-shell-inner grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_490px]">
          <RevealOnScroll className="order-2 xl:order-1">
            <div className="reveal-stagger">
              <h2
                className="reveal-stagger-item text-[38px] leading-none text-black md:text-[56px]"
                style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
              >
                Storage Tips
              </h2>
            </div>
            <div className="mt-8 space-y-8">
              {feedingStorageTips.map((tip, index) => (
                <RevealOnScroll key={tip.title} delayMs={index * 110}>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 inline-flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-white shadow-[0px_8px_14px_rgba(15,23,42,0.08)]">
                      <img alt="" className="h-6 w-6 object-contain" src={tip.icon} />
                    </span>
                    <div className="reveal-stagger">
                      <h3
                        className="reveal-stagger-item text-[18px] font-bold leading-7 text-black"
                        style={{ transitionDelay: "0ms" }}
                      >
                        {tip.title}
                      </h3>
                      <p
                        className="reveal-stagger-item mt-1 max-w-[40ch] text-[16px] leading-8 text-black/70"
                        style={{ transitionDelay: "90ms" }}
                      >
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            className="order-1 mx-auto w-full max-w-[340px] overflow-hidden rounded-[42px] shadow-[0px_8px_18px_rgba(15,23,42,0.14)] sm:max-w-[400px] md:max-w-[460px] xl:order-2 xl:max-w-none"
            delayMs={90}
          >
            <img
              alt="Two Tails pouch with a bowl of freeze-dried bites"
              className="h-full w-full object-cover object-center"
              src={siteAssets.feedingStoragePhoto}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section
        id="faq"
        className="relative z-20 scroll-mt-32 bg-white px-4 py-16 md:px-0 md:py-24"
      >
        <div className="site-shell-inner">
          <RevealOnScroll className="text-center">
            <div className="reveal-stagger">
              <h2
                className="reveal-stagger-item text-[38px] leading-none text-[#181c1d] md:text-[56px]"
                style={{ fontFamily: "var(--font-hero)", transitionDelay: "0ms" }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="reveal-stagger-item mx-auto mt-5 max-w-[42ch] text-[16px] leading-8 text-[#52606b] md:text-[18px]"
                style={{ transitionDelay: "90ms" }}
              >
                Hover or tap each card to flip from the question side into the detailed answer.
              </p>
            </div>
          </RevealOnScroll>

          <FaqCardsScroller />

          <RevealOnScroll delayMs={120}>
            <p className="mx-auto mt-10 text-center text-[17px] leading-8 text-[#52606b]">
              Have more questions?{" "}
              <a
                className="font-bold text-[#1d88ff] transition-colors duration-200 hover:text-[#006877]"
                href="http://wa.me/60183814392"
                rel="noreferrer"
                target="_blank"
              >
                Contact Us
              </a>
            </p>
          </RevealOnScroll>
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
                  Ready to Treat Them Better?
                </h2>
                <p
                  className="reveal-stagger-item mx-auto mt-6 max-w-[38ch] text-[16px] leading-7 text-[#111] md:text-[18px]"
                  style={{ fontFamily: "var(--font-body-alt)", transitionDelay: "90ms" }}
                >
                  Give your pets the nutrition they deserve with the flavor they can&apos;t
                  resist.
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
                    className="w-full max-w-[300px] border-transparent px-8 py-4 text-[16px] leading-6 shadow-[0px_4px_12px_rgba(15,23,42,0.08)]"
                    href="/benefits"
                  >
                    Back to Benefits
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
