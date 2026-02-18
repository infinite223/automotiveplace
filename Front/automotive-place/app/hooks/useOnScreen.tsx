import { RefObject, useEffect, useState } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    if (!ref.current) return;

    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref]);

  return isIntersecting;
}
