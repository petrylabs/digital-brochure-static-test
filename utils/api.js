const apiUrl = process.env.DOTCMS_HOST;

/**
 * GET request to API endpoint
 * @param {string} url API endpoint
 * @returns API response
 */
async function get(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // TODO: update below with API key
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.DOTCMS_USERNAME}:${process.env.DOTCMS_PASSWORD}`
          ).toString("base64"),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(`Could not get response: ${error}`);
    return { data: [], error };
  }
}

/**
 * Get all data for a given page & language, including all nested container data.
 * @param {string} languageId numerical ID for the language (see config.js)
 * @param {string} pageId page name in dotCMS -- e.g. "auto-insurance"
 * @returns {array} objects representing content "rows" for the given page
 */
export async function getPage(languageId = 1, pageId) {
  const url = pageId
    ? `${apiUrl}/v1/page/render/${pageId}/index?language_id=${languageId}`
    : `${apiUrl}/v1/page/render/index?language_id=${languageId}`;
  const pageDataResponse = await get(url);
  let { data, error } = pageDataResponse;

  if (data?.entity) {
    const { layout, containers, page } = data.entity;
    const content = getPageContent(layout.body.rows, containers).filter((x) =>
      Boolean(x)
    );

    /** Get all related content */
    const contentRelationships = content.map((item) => {
      if (item.contentType === "AccordionWidget") {
        return getAccordianWidgetData(
          item.tagsToDisplay,
          item.languageId,
          item.numberOfRowsToDisplay
        );
      } else if (item.contentType === "TestimonialCarouselWidget") {
        return getTestimonialWidgetData(item.tag, item.languageId);
      } else {
        return getContentRelationshipData(item.identifier, item.languageId);
      }
    });

    return Promise.all(contentRelationships).then((relations) => {
      relations.map((data, i) => {
        if (data.data.hasOwnProperty("contentlets")) {
          content[i].fields = data.data.contentlets;
        } else {
          content[i].fields = data.data[0];
        }
      });

      return {
        data: {
          title: page.title,
          seodescription: page.seodescription,
          description: page.description,
          content,
        },
        error,
      };
    });
  } else {
    return {
      data: null,
      error,
    };
  }
}

/**
 * Combine container structure into corresponding layout rows
 * @param {array} rows from entity.layout.body.rows
 * @param {array} containers from entity.containers
 * @returns
 */
function getPageContent(rows, containers) {
  let content = [];
  rows.map((row) => {
    row.columns.map((column) => {
      content = [...content, ...getFullContainers(column, containers)];
    })[0];
  });
  return content;
}

/**
 * Combine container structure into corresponding layout column
 * @param {*} column
 * @param {*} containers
 * @returns
 */
function getFullContainers(column, containers) {
  let contentlets;
  column.containers.map((container) => {
    const fullContainer = containers[container.identifier];
    contentlets = fullContainer.contentlets[`uuid-${container.uuid}`];
    return {
      ...fullContainer.container,
      contentlets: fullContainer.contentlets[`uuid-${container.uuid}`],
    };
  });
  return contentlets;
}

/**
 * Get related content from API based on a content identifier
 * @param {string} identifier unique identifier (id) of the current piece of content
 * @returns API response with the related content
 */
export function getContentRelationshipData(identifier, languageId) {
  return get(
    `${apiUrl}/content/depth/3/language/${languageId}/id/${identifier}`
  );
}

/**
 * Get related accordion widget data
 * @param {string} tagString tags to pull related content
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with the related content
 */
export function getAccordianWidgetData(tagString, languageId, numberOfItems) {
  const tags = tagString.split(",");
  const tagQuery = tags.map((x) => `+FAQ.tags:"${x}"`).join(" ");
  return get(
    `${apiUrl}/content/render/false/query/+contentType:FAQ ${tagQuery} +languageId:${languageId} +deleted:false +working:true/limit/${numberOfItems}/orderby/score,modDate desc`
  );
}

/**
 * Get related testimonial widget data
 * @param {string} tagString tags to pull related content
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with the related content
 */
export function getTestimonialWidgetData(tagString, languageId) {
  const tags = tagString.split(",");
  const tagQuery = tags.map((x) => `+Testimonial.tags:"${x}"`).join(" ");
  return get(
    `${apiUrl}/content/render/false/query/+contentType:Testimonial ${tagQuery} +languageId:${languageId} +deleted:false +working:true/orderby/score,modDate desc`
  );
}

/**
 * Get header data and menu items from API
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with header data and nav menu items
 */
export const getHeader = () => {
  return get(`${apiUrl}/vtl/headermenu`);
};

/**
 * Get footer data and menu items from API
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with footer data and menu items
 */
export const getFooter = () => {
  return get(`${apiUrl}/vtl/footermenu`);
};

/**
 * Get sign up modal data from API
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with sign up modal data
 */
export const getSignUpModal = () => {
  return get(`${apiUrl}/vtl/newsletterform`);
};

/**
 * Sign up modal form submission
 * @param {object} formData sign up form data
 * @returns API response with sign up form submission
 */
export const signUpSubmission = (formData) => {
  return get(`${apiUrl}/vtl/contact`, {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

/**
 * Get sign up success modal data from API
 * @param {string} languageId lamg key ("en" or "fr")
 * @returns API response with sign up success modal data
 */
export const getSignUpModalSuccessContent = (languageId = 1) => {
  return get(
    `${apiUrl}/v1/page/render/modals/newsletter-success-modal?language_id=${languageId}`
  );
};

/**
 * Get sign up error modal data from API
 * @param {string} languageId lamg key ("en" or "fr")
 * @returns API response with sign up error modal data
 */
export const getSignUpModalErrorContent = (languageId = 1) => {
  return get(
    `${apiUrl}/v1/page/render/modals/newsletter-error-modal?language_id=${languageId}`
  );
};

/**
 * Get sign up error modal data from API
 * @param {string} languageId lamg key ("en" or "fr")
 * @returns API response with sign up error modal data
 */
export const getFormErrors = (languageId = 1) => {
  return get(
    `${apiUrl}/content/render/false/query/+contentType:FormErrors +languageId:${languageId}`
  );
};

/**
 * Get Get a Quote modal data
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns get a quote modal data
 */
export async function getGaqModal() {
  const modalDataResponse = await get(
    `${apiUrl}/v1/page/render/modals/get-a-quote-2`
  );
  let { data, error } = modalDataResponse;

  if (data && data.entity) {
    const { layout, containers, page } = data.entity;
    const content = getPageContent(layout.body.rows, containers).filter((x) =>
      Boolean(x)
    );

    /** Get all related content */
    const contentRelationships = content.map((item) =>
      getContentRelationshipData(item.identifier, item.languageId)
    );

    return Promise.all(contentRelationships).then((relations) => {
      relations.map((data, i) => {
        content[i].fields = data.data.contentlets[0];
      });

      return {
        data: {
          title: page.title,
          description: page.description,
          content,
        },
        error,
      };
    });
  } else {
    return {
      data: null,
      error,
    };
  }
}

/**
 * Get search results from API
 * @param {string} languageId numerical ID for the language (see config.js)
 * @returns API response with search related data
 */
export const getSearchResults = () => {
  // needs to be updated to get content based on languageId
  var url = new URL(`${apiUrl}/es/search`);
  var raw = JSON.stringify({
    query: {
      query_string: {
        query: `+(contentType:FAQ contentType:Blog ) +languageId:1`,
      },
    },
    size: 1000,
    from: 0,
  });
  url.search = new URLSearchParams(raw).toString();
  return get(`${apiUrl}/es/search`, {
    method: "POST",
    body: raw,
    redirect: "follow",
  });
};

export const getRecaptchaSiteKey = () => {
  return get(`${apiUrl}/vtl/googleRecaptchaKey`);
};
