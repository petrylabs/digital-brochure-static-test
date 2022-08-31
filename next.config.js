const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

getBasePath = () => {
  return process.env.NODE_ENV === "development" ? "" : "/out";
};

module.exports = withNextPluginPreval({
  images: {
    domains: ["www.sonnet.ca"],
    loader: "custom",
  },
  basePath: getBasePath(),
});
