export const siteAssets = {
  logo: "/figma/logo.png",
  search: "/figma/search-icon.svg",
  cart: "/figma/cart-icon.svg",
  product: "/figma/product-hero-reference.png",
  badgeRealMeat: "/figma/badge-real-meat.svg",
  badgePreservatives: "/figma/badge-preservatives.svg",
  badgeGrainFree: "/figma/badge-grain-free.svg",
  benefitSensitive: "/figma/benefit-sensitive.svg",
  benefitProteinA: "/figma/benefit-protein.png",
  benefitProteinB: "/figma/benefit-protein-2.png",
  benefitGut: "/figma/benefit-gut.svg",
  quote: "/figma/quote-mark.svg",
  ctaArrow: "/figma/cta-arrow.svg",
  socialFacebook: "/figma/footer-facebook.png",
  socialInstagram: "/figma/footer-instagram.png",
  socialYoutube: "/figma/footer-youtube.png",
  send: "/figma/send-icon.svg",
  aboutHero: "/figma/about/hero-bg.png",
  aboutFreezeStack: "/figma/about/freeze-stack.png",
  aboutIngredientDuck: "/figma/about/ingredient-duck.png",
  aboutIngredientTuna: "/figma/about/ingredient-tuna.png",
  benefitsHero: "/figma/benefits/hero-bg.png",
  benefitsHeroChevron: "/figma/benefits/hero-chevron.svg",
  benefitsSensitive: "/figma/benefits/icon-sensitive.svg",
  benefitsProteinA: "/figma/benefits/icon-protein-a.png",
  benefitsProteinB: "/figma/benefits/icon-protein-b.png",
  benefitsOmega: "/figma/benefits/icon-omega.png",
  benefitsGrainFree: "/figma/benefits/icon-grain-free.png",
  benefitsNoArtificial: "/figma/benefits/icon-no-artificial.png",
  benefitsIngredientDuck: "/figma/benefits/ingredient-duck.png",
  benefitsIngredientTuna: "/figma/benefits/ingredient-tuna.png",
  benefitsBlend: "/figma/benefits/blend-bg.png",
  benefitsBlendVideo: "/figma/benefits/blend-bg.mp4",
  benefitsCheck: "/figma/benefits/check.svg",
  checkoutProduct: "/figma/checkout/product-card.png",
  thankYouHero: "/figma/thank-you/hero-pets.png",
  contactStudio: "/figma/contact-us/studio-visual.png",
  feedingHero: "/figma/feeding/hero-bg.png",
  feedingEnjoyPhoto: "/figma/feeding/enjoy-photo.png",
  feedingEnjoyVideo: "/figma/feeding/enjoy-video.mp4",
  feedingEnjoyStars: "/figma/feeding/enjoy-stars.svg",
  feedingEnjoyServeTreat: "/figma/feeding/icon-serve-treat.svg",
  feedingEnjoyRewardMoments: "/figma/feeding/icon-reward-moments.svg",
  feedingEnjoyDogsCats: "/figma/feeding/icon-dogs-cats.svg",
  feedingEnjoyLifeStages: "/figma/feeding/icon-life-stages.svg",
  feedingRoutineCat: "/figma/feeding/routine-cat.jpg",
  feedingRoutineSmallDog: "/figma/feeding/routine-small-dog.jpg",
  feedingRoutineLargeDog: "/figma/feeding/routine-large-dog.jpg",
  feedingPrepareServeDry: "/figma/feeding/icon-prepare-serve-dry.svg",
  feedingPrepareRehydrate: "/figma/feeding/icon-prepare-rehydrate.svg",
  feedingTipCalories: "/figma/feeding/icon-tip-calories.svg",
  feedingTipMonitor: "/figma/feeding/icon-tip-monitor.svg",
  feedingTipWater: "/figma/feeding/icon-tip-water.svg",
  feedingSuitablePhoto: "/figma/feeding/suitable-photo.png",
  feedingStoragePhoto: "/figma/feeding/storage-photo.png",
  feedingStorageCool: "/figma/feeding/icon-storage-cool.svg",
  feedingStorageReseal: "/figma/feeding/icon-storage-reseal.svg",
  feedingStoragePack: "/figma/feeding/icon-storage-pack.svg",
  feedingFaqSuitability: "/figma/feeding/icon-faq-suitability.svg",
  feedingFaqPuppies: "/figma/feeding/icon-faq-puppies.svg",
  feedingFaqIngredients: "/figma/feeding/icon-faq-ingredients.svg",
  feedingFaqGrainFree: "/figma/feeding/icon-faq-grain-free.svg",
  feedingFaqAdditives: "/figma/feeding/icon-faq-additives.svg",
  feedingFaqSensitivities: "/figma/feeding/icon-faq-sensitivities.svg",
  feedingFaqMeal: "/figma/feeding/icon-faq-meal.svg",
  feedingFaqDaily: "/figma/feeding/icon-faq-daily.svg",
} as const;

export const productUrl = "/checkout";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Benefits", href: "/benefits" },
  { label: "Feeding Guide", href: "/feeding-guide" },
  { label: "FAQ", href: "/feeding-guide#faq" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    items: [
      { label: "About", href: "/about" },
      { label: "Benefits & Ingredients", href: "/benefits" },
      { label: "Feeding Guide", href: "/feeding-guide" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQ", href: "/feeding-guide#faq" },
    ],
  },
] as const;

export const socialLinks = [
  {
    alt: "Signature Market on Facebook",
    href: "https://www.facebook.com/signaturemarket",
    icon: siteAssets.socialFacebook,
    imageClassName: "h-[25px] w-[14px]",
  },
  {
    alt: "Signature Market on Instagram",
    href: "https://www.instagram.com/signaturemarket",
    icon: siteAssets.socialInstagram,
    imageClassName: "h-[25px] w-[27px]",
  },
  {
    alt: "Signature Market on YouTube",
    href: "https://www.youtube.com/channel/UClqH7J_3J7UnQdcys3itLOw",
    icon: siteAssets.socialYoutube,
    imageClassName: "h-4 w-[23px]",
  },
] as const;

export const aboutHighlights = [
  {
    title: "Raw Frozen Freshness",
    description: "Made from raw duck meat and tuna for a naturally tasty reward.",
  },
  {
    title: "Nutrient-Rich Rewards",
    description:
      "Packed with easy-to-digest animal protein and omega-3 goodness in every cube.",
  },
  {
    title: "Crunchy, Convenient Bites",
    description:
      "Moisture is removed to create light, crunchy bites that are easy to serve and enjoyable to eat.",
  },
] as const;

export const aboutIngredients = [
  {
    title: "Duck Meat",
    description: "A rich source of animal protein for a satisfying meaty bite.",
    image: siteAssets.aboutIngredientDuck,
  },
  {
    title: "Tuna Fish Meat",
    description:
      "Adds savoury flavour and omega-3 fatty acids for added nutritional value.",
    image: siteAssets.aboutIngredientTuna,
  },
] as const;

export const benefitsFeatureCards = [
  {
    title: "Suitable for Sensitive Pets",
    icons: [{ src: siteAssets.benefitsSensitive, className: "h-[34px] w-[34px]" }],
  },
  {
    title: "100% Animal Proteins",
    icons: [
      {
        src: siteAssets.benefitsProteinA,
        className: "h-[20px] w-[20px] -rotate-[140deg] -scale-y-100 object-contain",
      },
      {
        src: siteAssets.benefitsProteinB,
        className: "h-[20px] w-[20px] rotate-[50deg] object-contain",
      },
    ],
  },
  {
    title: "Rich in Omega-3 Fatty Acids",
    icons: [{ src: siteAssets.benefitsOmega, className: "h-[24px] w-[34px] object-contain" }],
  },
  {
    title: "Grain-Free Recipe",
    icons: [{ src: siteAssets.benefitsGrainFree, className: "h-[34px] w-[34px] object-contain" }],
  },
  {
    title: "No Artificial Flavouring, Colouring, or Preservatives",
    icons: [{ src: siteAssets.benefitsNoArtificial, className: "h-[34px] w-[34px] object-contain" }],
  },
] as const;

export const benefitsIngredients = [
  {
    title: "Duck Meat",
    image: siteAssets.benefitsIngredientDuck,
    body: [
      { text: "A novel, " },
      { text: "easy-to-digest", highlight: true },
      { text: " protein recommended for pets with food sensitivities or allergies. Also rich in amino acids to support " },
      { text: "muscle growth", highlight: true },
      { text: "." },
    ],
  },
  {
    title: "Tuna Fish",
    image: siteAssets.benefitsIngredientTuna,
    body: [
      { text: "Rich in omega-3 fatty acids which help " },
      { text: "reduce skin itchiness and rashes", highlight: true },
      { text: ". Omega-3 also acts as an " },
      { text: "anti-inflammatory agent", highlight: true },
      { text: " which alleviates joint pain and Inflammatory Bowel Disease in pets." },
    ],
  },
] as const;

export const benefitsBlendPanels = [
  {
    eyebrow: "What Special",
    eyebrowClassName: "bg-[#1e293b] text-white",
    title: "Why This Blend Works",
    titleClassName: "text-[#0f172a]",
    itemClassName: "text-[#334155]",
    items: [
      "Meaty and tasty",
      "Freeze-dried into bite-sized cubes",
      "Easy reward format",
      "Suitable for both dogs and cats",
    ],
  },
  {
    eyebrow: "Our Care",
    eyebrowClassName: "bg-white text-[#0f1d23]",
    title: "Made with Sensitive Furkids in Mind",
    titleClassName: "text-white",
    itemClassName: "text-white",
    items: [
      "Easy-to-digest animal protein",
      "Grain-free recipe",
      "Thoughtful everyday treat choice",
      "For pet parents seeking a gentler option",
    ],
  },
] as const;

export const feedingEnjoyCards = [
  {
    title: "Serve as a treat",
    description: "The ideal snack between meals to keep them happy.",
    icon: siteAssets.feedingEnjoyServeTreat,
  },
  {
    title: "Reward moments",
    description: "Perfect for positive reinforcement during training sessions.",
    icon: siteAssets.feedingEnjoyRewardMoments,
  },
  {
    title: "Dogs & Cats",
    description: "A shared favorite that bridges the feline-canine divide.",
    icon: siteAssets.feedingEnjoyDogsCats,
  },
  {
    title: "All life stages",
    description: "Gentle enough for seniors and exciting for growing pups.",
    icon: siteAssets.feedingEnjoyLifeStages,
  },
] as const;

export const feedingRoutineSizes = [
  {
    title: "Cats & Mini Breeds",
    subtitle: "1-5kg Weight Range",
    dailyPieces: "1-5",
    image: siteAssets.feedingRoutineCat,
  },
  {
    title: "Small to Medium",
    subtitle: "6-25kg Weight Range",
    dailyPieces: "5-17",
    image: siteAssets.feedingRoutineSmallDog,
    recommended: true,
  },
  {
    title: "Medium to Large",
    subtitle: "Over 25kg Weight Range",
    dailyPieces: "17-25",
    image: siteAssets.feedingRoutineLargeDog,
  },
] as const;

export const feedingPreparationTips = [
  {
    title: "Serve Dry",
    description:
      "Offer straight from the bag for a satisfying, nutrient-dense crunch they'll love during training.",
    icon: siteAssets.feedingPrepareServeDry,
  },
  {
    title: "Rehydrate",
    description:
      "Soak in warm water for 3-5 minutes to create a soft, juicy texture, perfect for picky eaters or senior pets.",
    icon: siteAssets.feedingPrepareRehydrate,
  },
] as const;

export const feedingTips = [
  {
    text: "Treats should be <10% of daily calories",
    icon: siteAssets.feedingTipCalories,
  },
  {
    text: "Always monitor while feeding",
    icon: siteAssets.feedingTipMonitor,
  },
  {
    text: "Keep fresh water available at all times",
    icon: siteAssets.feedingTipWater,
  },
] as const;

export const feedingSuitableTags = [
  "For Dogs & Cats",
  "All Life Stages",
  "Bite-Sized Treat",
  "Everyday Reward",
] as const;

export const feedingStorageTips = [
  {
    title: "Store in a cool, dry place",
    description:
      "Keep away from direct sunlight and humidity to maintain crunch and freshness.",
    icon: siteAssets.feedingStorageCool,
  },
  {
    title: "Reseal properly",
    description:
      "Our bags are designed with a fresh-lock seal. Ensure it's pressed tight after every use.",
    icon: siteAssets.feedingStorageReseal,
  },
  {
    title: "Follow pack instructions",
    description:
      "Refer to the best-before date on the bottom of the pouch for peak quality.",
    icon: siteAssets.feedingStoragePack,
  },
] as const;

export const feedingFaqs = [
  {
    question: "Are these treats suitable for both dogs and cats?",
    answer:
      "Yes! Our Duck & Tuna Bites are formulated to meet the nutritional preferences and safety standards for both dogs and cats, making them perfect for multi-pet households.",
    icon: siteAssets.feedingFaqSuitability,
  },
  {
    question: "Can puppies and kittens eat these bites?",
    answer:
      "Absolutely. These treats are designed for all life stages. However, for very young pets, we recommend monitoring them closely and potentially breaking the bites into smaller pieces if needed.",
    icon: siteAssets.feedingFaqPuppies,
  },
  {
    question: "What are the main ingredients?",
    answer:
      "Our primary ingredients are high-quality duck and tuna. We use freeze-drying technology to preserve the natural nutrients and flavors of the raw ingredients without the need for fillers.",
    icon: siteAssets.feedingFaqIngredients,
  },
  {
    question: "Are Two Tails treats grain-free?",
    answer:
      "Yes, all our treats are 100% grain-free. We do not use any wheat, corn, soy, or other grain fillers.",
    icon: siteAssets.feedingFaqGrainFree,
  },
  {
    question: "Do you use artificial additives or preservatives?",
    answer:
      "Never. We pride ourselves on having no artificial colors, flavors, or chemical preservatives. The freeze-drying process acts as a natural preservation method.",
    icon: siteAssets.feedingFaqAdditives,
  },
  {
    question: "How do these treats handle food sensitivities?",
    answer:
      "Because our ingredient list is short and clean, these treats are often suitable for pets with sensitivities. Duck and tuna are high-quality proteins that are generally well-tolerated.",
    icon: siteAssets.feedingFaqSensitivities,
  },
  {
    question: "Can I use these as a meal replacement?",
    answer:
      "No, these are intended for supplemental feeding only and should not replace a complete and balanced daily diet. They are meant to be enjoyed as a treat.",
    icon: siteAssets.feedingFaqMeal,
  },
  {
    question: "How many can I give my pet daily?",
    answer:
      "This depends on your pet's size and activity level. As a general rule, treats should not exceed 10% of their daily calories. Refer to the guidance on our Daily Feeding Guide above.",
    icon: siteAssets.feedingFaqDaily,
  },
] as const;
