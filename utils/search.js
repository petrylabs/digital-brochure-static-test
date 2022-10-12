import searchResults from "../site-data/searchresults.preval";

export const searchData = (searchTerm, lang) => {
  if (!searchTerm) return null;

  const pattern = new RegExp("\\b" + searchTerm, "i");
  return searchResults[lang].data.contentlets.filter((x) =>
    pattern.test(x.title)
  );
};
