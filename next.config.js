const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

module.exports = withNextPluginPreval({
  images: {
    domains: ["www.sonnet.ca"],
  },
});
