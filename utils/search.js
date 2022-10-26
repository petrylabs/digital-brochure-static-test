export const buildSearchResultQuery = (
  keywords,
  contentTypes = [],
  languageId = "1",
  resultSize = 10,
  page = 1
) => {
  let contentTypeQuery = "";
  let luceneQuery = "";
  const offset = (page - 1) * resultSize;
  contentTypes.forEach(
    (contentType) => (contentTypeQuery += `contentType:${contentType} `)
  );
  luceneQuery =
    `+(${contentTypeQuery}) +catchall:${keywords}* title:'${keywords}'^15 title_dotraw:*${keywords}*^5 ` +
    `+languageId:${languageId} +deleted:false +working:true `;

  keywords.split(" ").forEach((keyword) => {
    luceneQuery += `title:${keyword}^5 `;
  });

  return `
  {
      "query" : {
          "query_string" : {
              "query" : "${luceneQuery}"
          }
      },
      "size":${resultSize},
      "from":${offset}
  }
  `;
};
