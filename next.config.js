const createNextPluginPreval = require("next-plugin-preval/config");
const withNextPluginPreval = createNextPluginPreval();

module.exports = withNextPluginPreval({
  images: {
    domains: ["www.sonnet.ca"],
    deviceSizes: [320, 576, 700, 768, 1024, 1200, 1440],
  },
});
