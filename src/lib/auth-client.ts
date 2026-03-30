"use client";

import { useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "twotails-authenticated";
const AUTH_CHANGE_EVENT = "twotails-auth-change";

export const regularUnitPrice = 36;
export const memberUnitPrice = 25;

function readAuthState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated(next: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, String(next));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function useAuthState() {
  const [authenticated, setAuthenticatedState] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAuthenticatedState(readAuthState());
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(AUTH_CHANGE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
    };
  }, []);

  return authenticated;
}

export function useProductPrice() {
  return useAuthState() ? memberUnitPrice : regularUnitPrice;
}
