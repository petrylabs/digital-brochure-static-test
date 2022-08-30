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
