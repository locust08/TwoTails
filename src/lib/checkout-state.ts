"use client";

import { useEffect, useState } from "react";

const CHECKOUT_QUANTITY_STORAGE_KEY = "twotails-checkout-quantity";
const CHECKOUT_QUANTITY_CHANGE_EVENT = "twotails-checkout-quantity-change";
const CHECKOUT_DELIVERY_METHOD_STORAGE_KEY = "twotails-checkout-delivery-method";
const CHECKOUT_DELIVERY_METHOD_CHANGE_EVENT = "twotails-checkout-delivery-method-change";

export type CheckoutDeliveryMethod = "standard" | "express";

function readCheckoutQuantity() {
  if (typeof window === "undefined") {
    return 1;
  }

  const rawValue = Number(window.localStorage.getItem(CHECKOUT_QUANTITY_STORAGE_KEY));

  if (!Number.isFinite(rawValue) || rawValue < 1) {
    return 1;
  }

  return Math.floor(rawValue);
}

function readCheckoutDeliveryMethod(): CheckoutDeliveryMethod {
  if (typeof window === "undefined") {
    return "standard";
  }

  const rawValue = window.localStorage.getItem(CHECKOUT_DELIVERY_METHOD_STORAGE_KEY);

  return rawValue === "express" ? "express" : "standard";
}

export function setCheckoutQuantity(next: number) {
  if (typeof window === "undefined") {
    return;
  }

  const safeQuantity = Math.max(1, Math.floor(next));
  window.localStorage.setItem(CHECKOUT_QUANTITY_STORAGE_KEY, String(safeQuantity));
  window.dispatchEvent(new Event(CHECKOUT_QUANTITY_CHANGE_EVENT));
}

export function setCheckoutDeliveryMethod(next: CheckoutDeliveryMethod) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CHECKOUT_DELIVERY_METHOD_STORAGE_KEY, next);
  window.dispatchEvent(new Event(CHECKOUT_DELIVERY_METHOD_CHANGE_EVENT));
}

export function useCheckoutQuantity(options?: { resetOnMount?: boolean }) {
  const [quantity, setQuantityState] = useState(1);
  const resetOnMount = options?.resetOnMount ?? false;

  useEffect(() => {
    const sync = () => {
      setQuantityState(readCheckoutQuantity());
    };

    if (resetOnMount) {
      setQuantityState(1);
      setCheckoutQuantity(1);
    } else {
      sync();
    }

    window.addEventListener("storage", sync);
    window.addEventListener(CHECKOUT_QUANTITY_CHANGE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHECKOUT_QUANTITY_CHANGE_EVENT, sync);
    };
  }, []);

  const updateQuantity = (next: number) => {
    setCheckoutQuantity(next);
  };

  return [quantity, updateQuantity] as const;
}

export function useCheckoutDeliveryMethod() {
  const [deliveryMethod, setDeliveryMethodState] =
    useState<CheckoutDeliveryMethod>("standard");

  useEffect(() => {
    const sync = () => {
      setDeliveryMethodState(readCheckoutDeliveryMethod());
    };

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CHECKOUT_DELIVERY_METHOD_CHANGE_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHECKOUT_DELIVERY_METHOD_CHANGE_EVENT, sync);
    };
  }, []);

  const updateDeliveryMethod = (next: CheckoutDeliveryMethod) => {
    setCheckoutDeliveryMethod(next);
  };

  return [deliveryMethod, updateDeliveryMethod] as const;
}
