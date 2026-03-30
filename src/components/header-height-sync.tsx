"use client";

import { useEffect } from "react";

export function HeaderHeightSync() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");

    if (!header) {
      return;
    }

    const syncHeaderHeight = () => {
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-header-height", `${height}px`);
    };

    syncHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      syncHeaderHeight();
    });

    resizeObserver.observe(header);
    window.addEventListener("resize", syncHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncHeaderHeight);
    };
  }, []);

  return null;
}
