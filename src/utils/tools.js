export const assending = (current, next) =>
  current.d.frequency - next.d.frequency;

export const descending = (current, next) =>
  next.d.frequency - current.d.frequency;

export const debounce = (fn, timeToWait = 100) => {
  let timeoutId;
  return function debouncedFn(...args) {
    const timeoutFn = () => {
      timeoutId = undefined;
      fn.apply(this, args);
    };
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(timeoutFn, timeToWait);
  };
};
