/**
 * Replaces <snt-link> in copy(string) with <a> tag
 **/
export function replaceSntLinkToAtag(copy) {
  while (copy.includes("snt-link")) {
    copy = copy.replace("snt-link", "a");
  }
  return copy;
}
