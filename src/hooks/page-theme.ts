import { useEffect, useSyncExternalStore } from "react";

export function usePageTheme(background: string, color: string) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.background = background;
    body.style.background = background;
    body.style.color = color;
  }, [background, color]);

  useEffect(() => {
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
      document.body.style.color = "";
    };
  }, []);
}

const emptySubscribe = () => () => {};

export function useClientMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
