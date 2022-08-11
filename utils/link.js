var checkDomain = function (url) {
  if (url.indexOf("//") === 0) {
    if (typeof window !== "undefined") {
      url = window.location.protocol + url;
    }
  }
  return url
    .toLowerCase()
    .replace(/([a-z])?:\/\//, "$1")
    .split("/")[0];
};

var isExternal = function (url) {
  if (typeof window !== "undefined") {
    return (
      (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
      checkDomain(window.location.href) !== checkDomain(url)
    );
  } else {
    return false;
  }
};

export default isExternal;
