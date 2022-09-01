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
 * Get page-related data
 * @param {string} slug page slug
 * @returns page data
 */
export async function getPage(slug) {
  const pageDataResponse = await get(`${apiUrl}/v1/page/render/${slug}/index`);
  let { data, error } = pageDataResponse;

  if (data && data.entity) {
    const { layout, containers, page } = data.entity;
    const content = getPageContent(layout.body.rows, containers).filter((x) =>
      Boolean(x)
    );

    /** Get all related content */
    const contentRelationships = content.map((item) => {
      if (item.contentType === "AccordionWidget") {
        return getAccordianWidgetData(item.tagsToDisplay);
      } else if (item.contentType === "TestimonialCarouselWidget") {
        return getTestimonialWidgetData(item.tag, item.languageId);
      } else {
        return getContentRelationshipData(item.identifier);
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
export function getContentRelationshipData(identifier) {
  return get(`${apiUrl}/v1/contentrelationships/id/${identifier}`);
}

/**
 * Get related accordian widget data
 * @param {string} tags tags to pull related content
 * @returns API response with the related content
 */
export function getAccordianWidgetData(tagString) {
  const tags = tagString.split(",");
  const tagQuery = tags.map((x) => `+FAQ.tags:"${x}"`).join(" ");
  return get(
    `${apiUrl}/content/render/false/query/+contentType:FAQ ${tagQuery} +deleted:false +working:true/orderby/score,modDate desc`
  );
}

/**
 * Get related testimonial widget data
 * @param {string} tags tags to pull related content
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
 * @returns API response with header data and nav menu items
 */
export const getHeader = () => {
  return get(`${apiUrl}/vtl/headermenu`);
};

/**
 * Get footer data and menu items from API
 * @returns API response with footer data and menu items
 */
export const getFooter = () => {
  return get(`${apiUrl}/vtl/footermenu`);
};

/**
 * Get sign up modal data from API
 * @returns API response with sign up modal data
 */
export const getNewsLetterModal = () => {
  return get(`${apiUrl}/vtl/newsletterform`);
};

/**
 * Get Get a Quote modal data
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
      getContentRelationshipData(item.identifier)
    );

    return Promise.all(contentRelationships).then((relations) => {
      relations.map((data, i) => {
        content[i].fields = data.data[0];
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
 * @returns API response with search related data
 */
export const getSearchResults = () => {
  var url = new URL(`${apiUrl}/es/search`);
  var raw = JSON.stringify({
    query: {
      query_string: {
        query: "+(contentType:FAQ contentType:Blog )",
      },
    },
    size: 500,
    from: 0,
  });
  url.search = new URLSearchParams(raw).toString();
  return get(`${apiUrl}/es/search`, {
    method: "POST",
    body: raw,
    redirect: "follow",
  });
};
