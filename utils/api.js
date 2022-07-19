const apiUrl = process.env.DOTCMS_HOST;

async function get(url) {
  try {
    const response = await fetch(url, {
      headers: {
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

export async function getPage(slug) {
  const pageDataResponse = await get(`${apiUrl}/page/render/${slug}/index`);
  let { data, error } = pageDataResponse;
  if (data) {
    const { layout, containers, page } = data.entity;
    const content = getPageContent(layout.body.rows, containers);
    const contentRelationships = content.map((item) =>
      getContentRelationshipData(item.identifier)
    );

    return Promise.all(contentRelationships).then((relations) => {
      relations.map((data, i) => {
        content[i].fields = data;
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

export const getContentRelationshipData = (identifier) => {
  return get(`${apiUrl}/contentrelationships/id/${identifier}`);
};

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

function getPageContent(rows, containers) {
  return rows.map((row) => {
    return row.columns.map((column) => {
      return getFullContainers(column, containers);
    })[0];
  });
}
