import headerData from "../site-data/header.preval";
import { evenIndexBeforeOdd } from "./array";

/**
 * Uses the fetched header data to re-organize and return the navigation items,
 * for use in mobile and desktop navigation
 * @returns {array} re-ordered navigation
 */
export default function getNavigation(lang) {
  const header = headerData[lang].data.headerMenu;

  return Object.entries(header.menuItems)
    .sort((a, b) => a[1].order - b[1].order) // re-order by `order` property
    .map((item) => {
      return {
        menuItem: item[0],
        ...item[1],
        subItems: evenIndexBeforeOdd(item[1].subItems), // reorder by column
      };
    });
}
