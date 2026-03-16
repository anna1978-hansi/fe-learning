/**
 * 外部点击关闭；
 * 目的：当用户点击某个元素“外面”的地方时，执行一个回调。
 * ref	需要监听的 DOM 元素
 * handler	点击外部时执行的函数
 */

import { useEffect } from "react";

function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      const el = ref?.current;

      // 如果没有元素 或 点击在内部 → 不处理
      if (!el || el.contains(event.target)) {
        return;
      }

      // 点击在外部
      handler(event);
    }

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;