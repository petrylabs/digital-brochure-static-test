/**
 * Some cotent(identifier, copy, in introContent in how can I save section) have a link component(snt-link) created by Sonnet team.
 * The tag needs to be replaced with a tag export function replaceToLink (copy)
 **/
export function replaceSntLinkToAtag(copy) {
  return copy.replaceAll("snt-link", "a");
}
