import { landingPageRoutes } from "../config";

export const getCurrentPath = (router) => {
  if (router.pathname === "/[slug]") {
    return landingPageRoutes.find((item) => item.path === router.query.slug);
  } else {
    return landingPageRoutes.find((item) => `/${item.path}` === router.asPath);
  }
};

export const getTogglePath = (currentPath, toggleLanguage) => {
  return landingPageRoutes?.find(
    (item) =>
      item.query.pageId === currentPath?.query?.pageId &&
      item.query.locale === toggleLanguage
  );
};
