"use client";

import { useEffect, useRef } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="hover"]';

export function PawCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);

    if (!mediaQuery.matches) {
      return;
    }

    let frameId = 0;
    let currentX = -160;
    let currentY = -160;
    let targetX = -160;
    let targetY = -160;
    let isVisible = false;
    let isPressed = false;
    let isInteractive = false;

    const syncDataState = () => {
      cursor.dataset.visible = String(isVisible);
      cursor.dataset.pressed = String(isPressed);
      cursor.dataset.interactive = String(isInteractive);
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;

      const scale = isPressed ? 0.94 : isInteractive ? 1.04 : 1;
      const rotation = isInteractive ? -4 : -9;

      cursor.style.transform = `translate3d(${currentX - 4}px, ${currentY - 4}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      isInteractive = Boolean(
        (event.target as Element | null)?.closest(INTERACTIVE_SELECTOR),
      );

      if (!isVisible) {
        currentX = targetX;
        currentY = targetY;
        isVisible = true;
      }

      syncDataState();
    };

    const handlePointerDown = () => {
      isPressed = true;
      syncDataState();
    };

    const handlePointerUp = () => {
      isPressed = false;
      syncDataState();
    };

    const handlePointerExit = () => {
      isVisible = false;
      isPressed = false;
      isInteractive = false;
      syncDataState();
    };

    const handleWindowMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        handlePointerExit();
      }
    };

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        handlePointerExit();
      }
    };

    syncDataState();
    frameId = window.requestAnimationFrame(render);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handlePointerExit);
    window.addEventListener("mouseout", handleWindowMouseOut);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handlePointerExit);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="paw-cursor"
      data-interactive="false"
      data-pressed="false"
      data-visible="false"
      ref={cursorRef}
    >
      <span className="paw-cursor__glow" />
      <span className="paw-cursor__toe paw-cursor__toe--1" />
      <span className="paw-cursor__toe paw-cursor__toe--2" />
      <span className="paw-cursor__toe paw-cursor__toe--3" />
      <span className="paw-cursor__toe paw-cursor__toe--4" />
      <span className="paw-cursor__pad" />
    </div>
  );
}
