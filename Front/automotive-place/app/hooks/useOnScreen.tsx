import {RefObject, useEffect, useMemo, useState} from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer: any = useMemo(
    () =>
      ref.current
        ? new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
          )
        : null,
    [ref]
  );

  useEffect(() => {
    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer]);

  return isIntersecting;
}
