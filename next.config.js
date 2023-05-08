/**
 * Set up Preval, which handles some API calls during build time
 */
const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

/**
 * Adds an upload directory to the base path on production builds, to ensure proper link and asset
 * paths when the built site is uploaded to dotCMS.
 */
const uploadDir = "out";
const getBasePath = () => {
  return process.env.NODE_ENV === "development" ? "" : ""; // `/${uploadDir}`
};

module.exports = withNextPluginPreval({
  images: {
    domains: ["www.sonnet.ca"],
    loader: "custom",
  },
  basePath: getBasePath(),
  env: {
    DOTCMS_HOST: process.env.DOTCMS_HOST,
    DOTCMS_USERNAME: process.env.DOTCMS_USERNAME,
    DOTCMS_PASSWORD: process.env.DOTCMS_PASSWORD,
  },
});
