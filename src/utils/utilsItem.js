import React, { useEffect, useState } from "react";

export const sliceWord = (word) => {
  return word.length > 20 ? word.slice(0, 20) + "..." : word;
};

export function useScreenWidth() {
  const [windowWidth, setWindowWidth] = useState(null);

  const isWindow = typeof window !== "undefined";

  const getWidth = () => (isWindow ? window.innerWidth : windowWidth);

  const resize = () => setWindowWidth(getWidth());

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());

      window.addEventListener("resize", resize);

      return () => window.removeEventListener("resize", resize);
    }
    //eslint-disable-next-line
  }, [isWindow]);

  return windowWidth;
}
