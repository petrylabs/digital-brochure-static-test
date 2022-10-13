/**
 * Re-orders items so that all the even-indexed items come (in order)
 * before the odd-indexed ones
 * @param {array} array items to re-order
 * @returns {array} re-ordered items
 */
export function evenIndexBeforeOdd(array) {
  let odds = [];
  let evens = [];
  array.forEach((item, index) => {
    if (index % 2 === 0 || index === 0) {
      evens.push(item);
    } else {
      odds.push(item);
    }
  });

  return [...evens, ...odds];
}

/**
 * Converts delimited string input to list of options
 * @param {*} listString eg: "No Month|blank\nJanuary|jan\nFebrurary|feb\nMarch|mar\nApril|apr\nMay|may\nJune|jun\nJuly|jul\nAugust|aug\nSeptember|sept\nOctober|oct\nNovember|nov\nDecember|dec"
 */
export const getDelimitedOptions = (listString, delimiter) => {
  const listArray = listString.split(delimiter);
  return listArray.map((x) => {
    const data = x.split("|");
    return {
      key: data[0],
      value: data[1],
    };
  });
};
