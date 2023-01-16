/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (fn: () =>void, wait: number) => {
  let inThrottle: boolean
  let lastFn: ReturnType<typeof setTimeout>
  let lastTime: number;

    
  return (args?: any) => {
    if (!inThrottle) {
      fn.apply(args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};