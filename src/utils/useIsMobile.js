import { useEffect, useState } from "react";
import _throttle from "lodash/throttle";

export default function useIsMobile(
  query = "(max-width:768px)",
  defaultTimeOut = 500
) {
  const [state, setState] = useState(window.matchMedia(query).matches);
  useEffect(() => {
    function onResize() {
      setState((prevState) =>
        prevState !== window.matchMedia(query).matches
          ? window.matchMedia(query).matches
          : prevState
      );
    }
    window.addEventListener("resize", _throttle(onResize, defaultTimeOut));
    return () => {
      window.removeEventListener("resize", _throttle(onResize, defaultTimeOut));
    };
  }, [query, defaultTimeOut]);

  return state;
}
