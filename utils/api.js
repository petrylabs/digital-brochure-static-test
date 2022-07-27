const apiUrl = process.env.DOTCMS_HOST;

/**
 * GET request to API endpoint
 * @param {string} url API endpoint
 * @returns API response
 */
async function get(url) {
  try {
    const response = await fetch(url, {
      headers: {
        // TODO: update below with API key
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.DOTCMS_USERNAME}:${process.env.DOTCMS_PASSWORD}`
          ).toString("base64"),
      },
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
  const pageDataResponse = await get(`${apiUrl}/page/render/${slug}/index`);
  let { data, error } = pageDataResponse;

  if (data && data.entity) {
    const { layout, containers, page } = data.entity;
    const content = getPageContent(layout.body.rows, containers);

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
  return rows.map((row) => {
    return row.columns.map((column) => {
      return getFullContainers(column, containers);
    })[0];
  });
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
    contentlets = fullContainer.contentlets[`uuid-${container.uuid}`][0];
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
  return get(`${apiUrl}/contentrelationships/id/${identifier}`);
}

export const getNav = () => {
  // add nav items call
};

export const getHeader = () => {
  // add header items call
};

export const getFooter = () => {
  // add footer items call
};

export const getModal = () => {
  // add modal items call
};
