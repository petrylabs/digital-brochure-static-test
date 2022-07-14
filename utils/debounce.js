export const debounce = (callback, wait) => {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default debounce;
