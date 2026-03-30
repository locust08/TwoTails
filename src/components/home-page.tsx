"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { productUrl, siteAssets } from "@/lib/site-data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { formatCurrency } from "@/components/checkout-shared";
import { PrimaryButton, SecondaryButton, SitePage } from "@/components/site-shell";
import { useAuthState, useProductPrice } from "@/lib/auth-client";

const benefitCards = [
  {
    iconClassName: "absolute left-1/2 top-[74px] h-[30px] w-[30px] -translate-x-1/2",
    iconSrc: siteAssets.benefitSensitive,
    title: "Suitable for Sensitive Pets",
    titleClassName: "absolute inset-x-[31px] top-[130px] text-center text-[20px] font-bold leading-[28px] text-[#0f172a]",
    wrapperClassName:
      "bg-[linear-gradient(180deg,rgba(172,213,255,0.2),rgba(255,255,255,0.2))] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
  },
  {
    iconGroup: true,
    title: "100% Animal Proteins",
    titleClassName: "absolute inset-x-[28px] top-[136px] text-center text-[20px] font-bold leading-[28px] text-[#0f172a]",
    wrapperClassName:
      "bg-[linear-gradient(180deg,rgba(214,233,252,0.82),rgba(241,248,255,0.98))] shadow-[0px_8px_10px_rgba(0,0,0,0.22)]",
  },
  {
    iconClassName: "absolute left-1/2 top-[71px] h-[30px] w-[27px] -translate-x-1/2",
    iconSrc: siteAssets.benefitGut,
    title: "Supports Gut Health",
    titleClassName: "absolute inset-x-[32px] top-[137px] text-center text-[20px] font-bold leading-[28px] text-[#0f172a]",
    wrapperClassName:
      "bg-[linear-gradient(180deg,rgba(172,213,255,0.2),rgba(255,255,255,0.2))] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
  },
] as const;

function PillBadge({
  className,
  delayMs = 0,
  driftClassName,
  iconClassName,
  label,
  src,
}: {
  className: string;
  delayMs?: number;
  driftClassName?: string;
  iconClassName: string;
  label: string;
  src: string;
}) {
  return (
    <div
      className={`motion-pill-pop absolute z-20 ${className}`.trim()}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div
        className={[
          "motion-pill-shell flex h-[30px] items-center justify-center rounded-full border border-[rgba(203,213,225,0.9)] bg-white/96 px-[14px] py-[8px] shadow-[0px_8px_20px_rgba(15,23,42,0.1)] backdrop-blur-[6px] sm:h-[32px] sm:px-4 sm:py-2 md:h-[34px] md:px-[17px] md:py-[9px]",
          driftClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex items-center gap-2">
          <img alt="" className={iconClassName} src={src} />
          <span className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#0f172a] sm:text-[11px] md:text-[12px]">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function BenefitCard({ index }: { index: number }) {
  const card = benefitCards[index];

  return (
    <article
      className={[
        "relative h-[275px] w-full overflow-hidden rounded-[24px] transition-transform duration-200 hover:-translate-y-1",
        card.wrapperClassName,
      ].join(" ")}
    >
      {"iconGroup" in card && card.iconGroup ? (
        <div className="absolute left-1/2 top-[55px] flex -translate-x-1/2 items-end gap-[2px]">
          <img
            alt=""
            className="h-[42px] w-[50px]"
            src={siteAssets.benefitProteinA}
          />
          <img
            alt=""
            className="h-[43px] w-[49px]"
            src={siteAssets.benefitProteinB}
          />
        </div>
      ) : (
        <img
          alt=""
          className={"iconClassName" in card ? card.iconClassName : ""}
          src={"iconSrc" in card ? card.iconSrc : ""}
        />
      )}
      <div className={card.titleClassName}>{card.title}</div>
    </article>
  );
}

function getCenteredBenefitCardIndex(viewport: HTMLDivElement) {
  const cards = Array.from(
    viewport.querySelectorAll<HTMLElement>("[data-benefit-card]"),
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

function FeatureCards() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const syncActiveIndex = () => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      setActiveIndex(getCenteredBenefitCardIndex(viewport));
    };

    syncActiveIndex();
    window.addEventListener("resize", syncActiveIndex);

    return () => window.removeEventListener("resize", syncActiveIndex);
  }, []);

  return (
    <>
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 xl:hidden">
        <div
          ref={viewportRef}
          className="overflow-x-auto overflow-y-visible pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={() => {
            const viewport = viewportRef.current;
            if (!viewport) {
              return;
            }

            setActiveIndex(getCenteredBenefitCardIndex(viewport));
          }}
        >
          <div className="mx-auto flex w-max touch-pan-x snap-x snap-mandatory gap-5 pl-[1cm] pr-1 md:gap-6 md:pl-[1cm]">
            {benefitCards.map((card, index) => (
              <div
                key={card.title}
                data-benefit-card
                className="w-[min(84vw,20rem)] shrink-0 snap-start sm:w-[min(62vw,21rem)] lg:w-[min(42vw,22rem)]"
              >
                <RevealOnScroll className="h-full" delayMs={index * 110}>
                  <BenefitCard index={index} />
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          {benefitCards.map((card, index) => (
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

      <div className="reveal-stagger hidden w-full max-w-[768px] xl:flex xl:flex-row xl:gap-8">
        {benefitCards.map((card, index) => (
          <div
            key={card.title}
            className="reveal-stagger-item flex-1"
            style={{ transitionDelay: `${index * 110}ms` }}
          >
            <BenefitCard index={index} />
          </div>
        ))}
      </div>
    </>
  );
}

function WideAction({
  children,
  className,
  href,
  inverted,
  trailing,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  inverted?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <a
      className={[
        "inline-flex h-[44px] w-full max-w-[280px] items-center justify-center rounded-[12px] px-6 text-[16px] font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 sm:h-[46px] sm:max-w-[284px] sm:px-8 sm:text-[17px] md:h-[46px] md:w-[278px] md:max-w-none md:px-[34px] md:text-[18px]",
        inverted
          ? "border-2 border-[rgba(196,212,215,0.36)] bg-[rgba(255,255,255,0.1)] text-[#1e293b]"
          : "gap-[22px] bg-black text-white",
        className,
      ].join(" ")}
      href={href}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <span>{children}</span>
      {trailing}
    </a>
  );
}

function HeroGlow({
  className,
}: {
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-full bg-[radial-gradient(circle,rgba(157,211,255,0.34)_0%,rgba(157,211,255,0.1)_48%,rgba(255,255,255,0)_76%)] blur-[18px] ${className}`.trim()}
    />
  );
}

export function HomePage() {
  const authenticated = useAuthState();
  const unitPrice = useProductPrice();

  return (
    <SitePage activeLabel="Home" coverHero>
      <section
        id="top"
        className="relative z-10 bg-white"
      >
        <div className="relative mx-auto min-h-[calc(620px-1cm)] w-full max-w-none overflow-hidden px-4 pb-8 pt-0 sm:min-h-[calc(660px-1cm)] md:h-[calc(100svh-var(--site-header-height)-1cm)] md:min-h-[calc(680px-1cm)] md:px-0 md:pb-0 md:pt-0 2xl:min-h-[calc(760px-1cm)]">
          <div className="pointer-events-none absolute inset-0">
            <HeroGlow className="left-[2%] top-[102px] h-[132px] w-[132px] sm:left-[8%] sm:top-[92px] sm:h-[170px] sm:w-[170px] md:left-[132px] md:h-[200px] md:w-[200px]" />
            <HeroGlow className="right-[1%] top-[108px] h-[142px] w-[142px] sm:right-[7%] sm:top-[92px] sm:h-[188px] sm:w-[188px] md:right-[124px] md:top-[82px] md:h-[220px] md:w-[220px]" />
            <div className="absolute left-1/2 top-[110px] h-[310px] w-[310px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(170,214,255,0.2)_0%,rgba(255,255,255,0)_72%)] blur-[14px] sm:top-[86px] sm:h-[380px] sm:w-[380px] md:top-[56px] md:h-[520px] md:w-[520px]" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[190px] z-0 flex h-[96px] w-full -translate-x-1/2 items-center justify-center px-2 sm:top-[214px] sm:h-[122px] md:left-[calc(50%+1cm)] md:top-[222px] md:h-[192px] md:w-auto md:max-w-[calc(100vw-4rem)] md:px-0">
            <p
              className="mx-auto block whitespace-nowrap text-center text-[clamp(64px,18vw,108px)] uppercase leading-none text-[#949494] opacity-45 [letter-spacing:clamp(0px,0.7vw,4px)] [text-shadow:0px_16px_4px_rgba(0,0,0,0.15)] sm:text-[clamp(82px,17vw,132px)] sm:[letter-spacing:clamp(14px,3.4vw,30px)] md:text-[clamp(132px,14vw,192px)] md:[letter-spacing:clamp(0px,0.35vw,3px)] md:[text-shadow:0px_20px_4px_rgba(0,0,0,0.18)] lg:[letter-spacing:clamp(0px,0.15vw,1px)] xl:[letter-spacing:clamp(30px,4vw,55px)]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {"TWO  TAILS"}
            </p>
          </div>

          <div className="relative min-h-[calc(620px-1cm)] sm:min-h-[calc(660px-1cm)] md:block md:h-full md:min-h-0">
            <div>
              <div className="pointer-events-none absolute left-1/2 top-[90px] z-10 w-[min(78vw,312px)] -translate-x-1/2 sm:top-[92px] sm:w-[min(70vw,364px)] md:top-[52px] md:w-[min(44vw,612px)] md:max-w-none xl:w-[min(40vw,680px)] 2xl:w-[min(36vw,760px)]">
                <div className="motion-hero-pop">
                  <img
                    alt="Two Tails product pouch"
                    className="motion-float-soft mx-auto h-auto w-full"
                    decoding="async"
                    fetchPriority="high"
                    src={siteAssets.product}
                  />
                </div>
              </div>

              <PillBadge
                className="left-[6px] top-[124px] w-[138px] sm:left-[18px] sm:top-[140px] sm:w-[154px] md:left-[calc(50%-420px)] md:top-[152px] md:w-[184px]"
                delayMs={140}
                driftClassName="motion-pill-float-a"
                iconClassName="h-[10px] w-[7px] sm:h-[10.5px] sm:w-[7.8px] md:h-[11.667px] md:w-[8.75px]"
                label="100% REAL MEAT"
                src={siteAssets.badgeRealMeat}
              />
              <PillBadge
                className="right-[4px] top-[76px] w-[154px] sm:right-[18px] sm:top-[84px] sm:w-[168px] md:left-[calc(50%+194px)] md:top-[92px] md:right-auto md:w-auto"
                delayMs={260}
                driftClassName="motion-pill-float-b"
                iconClassName="size-[10px] sm:size-[10.5px] md:size-[11.667px]"
                label="NO PRESERVATIVES"
                src={siteAssets.badgePreservatives}
              />
              <PillBadge
                className="right-[14px] top-[calc(408px-2cm)] w-[124px] sm:right-[28px] sm:top-[calc(446px-2cm)] sm:w-[132px] md:left-[calc(50%+212px)] md:top-[calc(415px-2cm)] md:right-auto md:w-auto xl:top-[415px]"
                delayMs={380}
                driftClassName="motion-pill-float-c"
                iconClassName="h-[8px] w-[10px] sm:h-[8.6px] sm:w-[10.8px] md:h-[9.333px] md:w-[11.667px]"
                label="GRAIN-FREE"
                src={siteAssets.badgeGrainFree}
              />
            </div>

            <div className="absolute inset-x-0 bottom-[calc(34px+1cm)] z-20 flex flex-col items-center gap-3 px-4 sm:bottom-[calc(38px+1cm)] sm:flex-row sm:justify-center sm:gap-5 md:bottom-[calc(34px+1cm)] md:left-1/2 md:right-auto md:w-auto md:max-w-none md:-translate-x-1/2 md:flex-row md:gap-[118px] md:px-0">
              <WideAction
                className="md:!w-[278px]"
                href={productUrl}
                trailing={<img alt="" className="size-4" src={siteAssets.ctaArrow} />}
              >
                Shop Now
              </WideAction>
              <WideAction
                className="!border !border-[#d8e2e7] !bg-white !text-[#1e293b] !shadow-[0px_5px_0px_rgba(214,224,231,0.95),0px_14px_22px_rgba(15,23,42,0.14)] hover:!shadow-[0px_7px_0px_rgba(214,224,231,0.92),0px_18px_26px_rgba(15,23,42,0.16)] md:!w-[278px]"
                href="/about"
                inverted
              >
                Learn More
              </WideAction>
            </div>
          </div>
        </div>
      </section>

      <section
        id="benefits"
        className="relative z-20 bg-[#f2fbff] px-4 py-20 md:px-0"
      >
        <RevealOnScroll className="site-shell-inner flex flex-col items-center md:px-[clamp(2rem,10vw,8.75rem)]">
          <p className="text-center text-[14px] font-bold uppercase tracking-[1.4px] text-[#6a9dd1]">
            Small Bites, Big Benefits
          </p>
          <h2
            className="mt-[23px] text-center text-[36px] leading-[42px] text-[#0f172a] md:text-[56px] md:leading-[80px]"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Why Pets Love It, Why Owners Trust It
          </h2>
          <div
            className="mt-[23px] max-w-[737px] text-center text-[16px] leading-[28px] text-[#475569] md:text-[18px] md:leading-[30px]"
            style={{ fontFamily: "var(--font-body-alt)" }}
          >
            <p>
              Got a <span className="text-[#5ea0ff]">picky eater</span> or a pet with a{" "}
              <span className="text-[#79b0ff]">sensitive tummy</span>?
            </p>
            <p>
              These freeze-dried bites are made with 100% animal protein and minimal
              processing for a tasty, easy-to-digest reward.
            </p>
          </div>

          <div className="flex w-full justify-center pt-10">
            <FeatureCards />
          </div>
        </RevealOnScroll>
      </section>

      <section className="relative z-20 bg-white px-4 py-20 md:px-0">
        <RevealOnScroll className="site-shell-inner flex flex-col items-center md:px-[clamp(2rem,14vw,16rem)]">
          <img alt="" className="h-6 w-[34px]" src={siteAssets.quote} />
          <div className="mt-6 text-center text-[28px] font-medium leading-[36px] text-[#1e293b] md:text-[36px] md:leading-[40px]">
            <p>&quot;A good pet snack is not just a reward.</p>
            <p>It is a small moment of care.&quot;</p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 pt-2">
            <span className="h-px w-12 bg-[#8ddfff]" />
            <span className="text-[14px] font-bold uppercase tracking-[1.4px] text-[#64748b]">
              Signature Market
            </span>
            <span className="h-px w-12 bg-[#8ddfff]" />
          </div>
        </RevealOnScroll>
      </section>

      <section className="relative z-20 bg-white px-4 pb-12 pt-[31px] md:px-0 md:pb-[40px]">
        <RevealOnScroll className="site-shell-inner md:px-[clamp(2rem,16vw,19rem)]">
          <div className="relative overflow-hidden rounded-[40px] bg-[rgba(13,133,255,0.2)] p-8 shadow-[0px_25px_50px_-12px_rgba(106,157,209,0.2)] md:p-12">
            <div className="absolute right-[-128px] top-[-128px] size-[256px] rounded-full bg-[rgba(255,255,255,0.1)]" />
            <div className="absolute bottom-[-64px] left-[-64px] size-[128px] rounded-full bg-[rgba(255,255,255,0.05)]" />

            <div className="relative flex flex-col items-center gap-6">
              <h2
                className="text-center text-[34px] leading-[40px] text-black md:text-[48px] md:leading-[48px]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                Give them the best life.
              </h2>
              <div className="max-w-[576px] text-center text-[16px] leading-[26px] text-[rgba(75,75,75,0.9)] md:text-[18px] md:leading-[28px]">
                <p>Join 50,000+ happy pet parents who have switched to Two Tails for</p>
                <p>better digestion and more tail wags.</p>
              </div>
              <div
                className={[
                  "pt-4",
                  authenticated
                    ? "flex justify-center"
                    : "flex flex-col gap-4 sm:flex-row",
                ].join(" ")}
              >
                <PrimaryButton
                  className="px-8 py-[17px] text-[18px] leading-7 md:px-10 md:text-[20px]"
                  href={productUrl}
                >
                  {`Buy Now - ${formatCurrency(unitPrice)}`}
                </PrimaryButton>
                {!authenticated ? (
                  <SecondaryButton
                    className="px-7 py-[17px] text-[16px] leading-7 md:px-[41px] md:text-[18px]"
                    href="/register"
                  >
                    Subscribe &amp; Save 30%
                  </SecondaryButton>
                ) : null}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </SitePage>
  );
}
