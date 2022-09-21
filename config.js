export const baseUrl = "https://www.sonnet.ca";

export const pageSlugs = [
  "auto-insurance",
  "condo-insurance",
  "home-insurance",
  "tenant-insurance",
];

export const languageId = {
  en: 1,
  fr: 1584454943708,
};

export const slugData = [
  { pageId: "auto-insurance", langId: languageId.en, slug: "auto-insurance" },
  { pageId: "auto-insurance", langId: languageId.fr, slug: "assurance-auto" },
  { pageId: "home-insurance", langId: languageId.en, slug: "home-insurance" },
  {
    pageId: "home-insurance",
    langId: languageId.fr,
    slug: "assurance-habitation",
  },
  { pageId: "condo-insurance", langId: languageId.en, slug: "condo-insurance" },
  {
    pageId: "condo-insurance",
    langId: languageId.fr,
    slug: "assurance-coproprietaires",
  },
  {
    pageId: "tenant-insurance",
    langId: languageId.en,
    slug: "tenant-insurance",
  },
  {
    pageId: "tenant-insurance",
    langId: languageId.fr,
    slug: "assurance-locataires",
  },
];

/** For Google Tag Manager */
export const GTMContainerId = "GTM-TF8DP3";

/** Minimum pixel width for each screen size */
export const breakpoints = {
  xs: 0,
  ssm: 320,
  sm: 576,
  smd: 700,
  md: 768,
  lg: 1024,
  blg: 1200,
  xl: 1440,
};
