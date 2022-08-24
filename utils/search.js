import * as JsSearch from "js-search";
import searchResults from "../site-data/searchresults.preval";

export const searchData = (searchTerm) => {
  const search = new JsSearch.Search("identifier");
  search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
  search.addIndex("title");
  search.addIndex("metaDescription");
  search.addIndex("copy");
  search.addIndex("headline");
  search.addIndex("metaTitle");
  search.addIndex("answer");
  search.addDocuments(searchResults.data.contentlets);
  return search.search(searchTerm);
};
