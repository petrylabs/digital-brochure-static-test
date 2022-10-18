export const baseUrl = "https://www.sonnet.ca";

export const languageId = {
  en: 1,
  fr: 1584454943708,
};

export const locales = {
  en: "en",
  fr: "fr",
};

export const landingPageRoutes = [
  {
    path: "/",
    query: {
      pageId: "index",
      langId: languageId.en,
      locale: locales.en,
    },
  },
  {
    path: "/fr",
    query: {
      pageId: "index",
      langId: languageId.fr,
      locale: locales.fr,
    },
  },
  {
    path: "auto-insurance",
    query: {
      pageId: "auto-insurance",
      langId: languageId.en,
      locale: locales.en,
    },
  },
  {
    path: "assurance-auto",
    query: {
      pageId: "auto-insurance",
      langId: languageId.fr,
      locale: locales.fr,
    },
  },
  {
    path: "home-insurance",
    query: {
      pageId: "home-insurance",
      langId: languageId.en,
      locale: locales.en,
    },
  },
  {
    path: "assurance-habitation",
    query: {
      pageId: "home-insurance",
      langId: languageId.fr,
      locale: locales.fr,
    },
  },
  {
    path: "condo-insurance",
    query: {
      pageId: "condo-insurance",
      langId: languageId.en,
      locale: locales.en,
    },
  },
  {
    path: "assurance-coproprietaires",
    query: {
      pageId: "condo-insurance",
      langId: languageId.fr,
      locale: locales.fr,
    },
  },
  {
    path: "tenant-insurance",
    query: {
      pageId: "tenant-insurance",
      langId: languageId.en,
      locale: locales.en,
    },
  },
  {
    path: "assurance-locataires",
    query: {
      pageId: "tenant-insurance",
      langId: languageId.fr,
      locale: locales.fr,
    },
  },
];

export const newsLetterFormKey = "newsLetterForm";

/** For Google Tag Manager */
export const GTMContainerId = "GTM-TF8DP3";

/** Minimum pixel width for each screen size */
export const breakpoints = {
  xs: 0,
  ssm: 320,
  smm: 480,
  sm: 576,
  smd: 700,
  md: 768,
  lg: 1024,
  blg: 1200,
  xl: 1440,
};
