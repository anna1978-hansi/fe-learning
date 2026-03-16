
/**
 * 核心：固定时间执行一次
 * 别的和防抖一样
 * 主要是这里需要用ref管理值，不然重复render
 */
import { useRef } from "react";

function useThrottle(fn, delay = 200) {
  const lastTime = useRef(0);

  return (...args) => {
    const now = Date.now();

    if (now - lastTime.current > delay) {
      fn(...args);
      lastTime.current = now;
    }
  };
}