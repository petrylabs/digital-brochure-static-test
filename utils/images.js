/**
 * Utilities for extracting required information from image data returned from API
 */

import { baseUrl } from "../config";

const imageFields = [
  "desktopImage",
  "desktopHdImage",
  "tabletImage",
  "mobileImage",
  "image",
  "imageSmall",
  "featureImage",
  "featureImageSmall",
  "blogArticleImage",
];

/**
 * Get first image object from appropriate image field (second one has mostly duplicate data)
 *
 * @param {object} contentObj top-level content object returned in getPageContent array
 * @param {string} field field name
 * @returns {object} image data
 */
function imageData(contentObj, field) {
  if (imageFields.includes(field)) {
    return contentObj?.fields[0]?.[field];
  } else console.error(`The provided field '${field}' is not an image field`);
}

/**
 * Get image source URL
 *
 * @param {object} contentObj top-level content object returned in getPageContent array
 * @param {string} field field name
 * @returns {string} image URL
 */
export function imageSrc(contentObj, field, lang = 1) {
  const { identifier, fileName } = imageData(contentObj, field);
  const cleanFileName = fileName?.replace("@", "%40");
  return `${baseUrl}/dA/${identifier}/${cleanFileName}?language_id=${lang}`;
}

/**
 * Get image alt text
 *
 * @param {object} contentObj top-level content object returned in getPageContent array
 * @param {string} field field name
 * @returns {string} alt text property
 */
export function imageAlt(contentObj, field) {
  const { altText } = imageData(contentObj, field);
  return altText;
}

/**
 * Custom image loader for `Image` component
 */
export const customLoader = ({ src }) => src;
