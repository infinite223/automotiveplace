import {RefObject, useEffect, useMemo, useState} from "react";

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  deps: any[] = []
) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, observer, ...deps]);

  return isIntersecting;
}
