/**
 * Replaces <snt-link> in copy(string) with <a> tag
 **/
export function replaceSntLinkToAtag(copy) {
  return copy.replaceAll("snt-link", "a");
}
