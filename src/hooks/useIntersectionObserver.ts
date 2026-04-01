import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  onIntersect: () => void,

  enabled = true,
) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) return;

    const target = sentinelRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          callbackRef.current();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled]);

  return sentinelRef;
}
