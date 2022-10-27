import parse from "html-react-parser";

/**
 * Make a substring bold within a string
 * @param {string} subStr the test string, portion to be highlighted
 * @param {string} str the complete string to check
 */
function highlight(subStr, str) {
  let search = subStr;

  if (typeof search == "string") {
    search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    var re = new RegExp(search, "gi");
    if (search.length > 0) {
      return parse(str.replace(re, `<b>$&</b>`));
    } else {
      return str;
    }
  }
}

export default highlight;
