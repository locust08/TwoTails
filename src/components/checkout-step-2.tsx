"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  House,
  MapPinned,
  PencilLine,
  X,
} from "lucide-react";
import { CheckoutPageFrame } from "@/components/checkout-shell";
import {
  CheckoutCallToAction,
  CheckoutCard,
  CirclePlus,
  CtaPawIcon,
  expressShippingPrice,
  formatCurrency,
  processingFee,
  ProductLineItem,
  SatisfactionCard,
  SelectionCheck,
  SidebarHeading,
  standardShippingPrice,
  SummaryRow,
} from "@/components/checkout-shared";
import { useProductPrice } from "@/lib/auth-client";
import {
  type CheckoutDeliveryMethod,
  useCheckoutDeliveryMethod,
  useCheckoutQuantity,
} from "@/lib/checkout-state";
type AddressChoice = "home" | "alternate";

type AddressDetails = {
  city: string;
  line1: string;
  line2: string;
  name: string;
  phone: string;
  postcode: string;
};

const initialHomeAddress: AddressDetails = {
  city: "Barking City",
  line1: "123 Puppy Lane",
  line2: "Golden Retriever Heights",
  name: "Jane Doe",
  phone: "+6012-3456",
  postcode: "90210",
};

const emptyAddress: AddressDetails = {
  city: "",
  line1: "",
  line2: "",
  name: "",
  phone: "",
  postcode: "",
};

const CHECKOUT_HOME_ADDRESS_STORAGE_KEY = "twotails-checkout-home-address";
const CHECKOUT_ALTERNATE_ADDRESS_STORAGE_KEY = "twotails-checkout-alternate-address";
const CHECKOUT_SELECTED_ADDRESS_STORAGE_KEY = "twotails-checkout-selected-address";

function readStoredAddress(key: string): AddressDetails | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AddressDetails>;

    return {
      city: parsed.city ?? "",
      line1: parsed.line1 ?? "",
      line2: parsed.line2 ?? "",
      name: parsed.name ?? "",
      phone: parsed.phone ?? "",
      postcode: parsed.postcode ?? "",
    };
  } catch {
    return null;
  }
}

function writeStoredAddress(key: string, value: AddressDetails | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!value) {
    window.localStorage.removeItem(key);
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function readStoredAddressChoice(): AddressChoice {
  if (typeof window === "undefined") {
    return "home";
  }

  return window.localStorage.getItem(CHECKOUT_SELECTED_ADDRESS_STORAGE_KEY) === "alternate"
    ? "alternate"
    : "home";
}

function ShippingMethodCard({
  deliveryMethod,
  onSelect,
  price,
  subtitle,
  title,
  value,
}: {
  deliveryMethod: CheckoutDeliveryMethod;
  onSelect: (value: CheckoutDeliveryMethod) => void;
  price: string;
  subtitle: string;
  title: string;
  value: CheckoutDeliveryMethod;
}) {
  const selected = deliveryMethod === value;

  return (
    <button
      className={[
        "relative rounded-[12px] border-2 p-[22px] text-left transition-transform duration-200 hover:-translate-y-0.5",
        selected
          ? "border-[#f1f5f9] bg-[rgba(174,214,255,0.28)] shadow-[0px_4px_4px_rgba(0,0,0,0.18)]"
          : "border-[#f1f5f9] bg-white",
      ].join(" ")}
      onClick={() => onSelect(value)}
      type="button"
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          {value === "standard" ? (
            <svg
              aria-hidden="true"
              className="size-7 text-[#94a3b8]"
              fill="none"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.917 6.417H18.083V18.083H2.917V6.417ZM18.083 10.5H22.039L25.083 14.549V18.083H18.083V10.5ZM8.75 21C10.04 21 11.083 19.957 11.083 18.667C11.083 17.377 10.04 16.333 8.75 16.333C7.46 16.333 6.417 17.377 6.417 18.667C6.417 19.957 7.46 21 8.75 21ZM19.25 21C20.54 21 21.583 19.957 21.583 18.667C21.583 17.377 20.54 16.333 19.25 16.333C17.96 16.333 16.917 17.377 16.917 18.667C16.917 19.957 17.96 21 19.25 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          ) : (
            <ArrowRight className="size-6 rotate-[-45deg] text-[#94a3b8]" strokeWidth={2.1} />
          )}
          <h3 className="mt-3 text-[16px] font-bold leading-6 text-[#0f172a]">{title}</h3>
          <p className="text-[14px] leading-5 text-[#64748b]">{subtitle}</p>
        </div>
        <p className="text-[18px] font-extrabold leading-7 text-[#0f172a]">{price}</p>
      </div>
      {selected ? <SelectionCheck /> : null}
    </button>
  );
}

function Step2Summary({
  quantity,
  shippingPrice,
  shippingTitle,
}: {
  quantity: number;
  shippingPrice: number;
  shippingTitle: string;
}) {
  const unitPrice = useProductPrice();
  const total = useMemo(
    () => quantity * unitPrice + processingFee + shippingPrice,
    [quantity, shippingPrice, unitPrice],
  );

  return (
    <div className="space-y-6">
      <CheckoutCard>
        <SidebarHeading>Order Summary</SidebarHeading>
        <div className="mt-5">
          <ProductLineItem compact quantity={quantity} />
        </div>
        <div className="mt-6 border-t border-[#f1f5f9] pt-6">
          <div className="space-y-3">
            <SummaryRow label="Subtotal" value={formatCurrency(quantity * unitPrice)} />
            <SummaryRow
              label={`Shipping (${shippingTitle})`}
              value={formatCurrency(shippingPrice)}
            />
            <SummaryRow label="Processing Fee" value={formatCurrency(processingFee)} />
          </div>
          <div className="mt-4 border-t border-[#f1f5f9] pt-4">
            <div className="flex items-end justify-between gap-4">
              <span className="text-[18px] font-extrabold leading-7 text-[#0f172a]">
                Total
              </span>
              <span className="text-[24px] font-extrabold leading-8 tracking-[-0.6px] text-[#0f172a]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <CheckoutCallToAction href="/checkout/payment" icon={<CtaPawIcon />}>
            Continue to Payment
          </CheckoutCallToAction>
        </div>
        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
          Secure SSL Checkout
        </p>
      </CheckoutCard>
      <SatisfactionCard />
    </div>
  );
}

function formatAddress(details: AddressDetails) {
  return [
    details.line1,
    details.line2,
    `${details.city}, ${details.postcode}`,
  ].filter(Boolean);
}

function AddressField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.04em] text-[#64748b]">
        {label}
      </span>
      <input
        className="h-11 w-full rounded-[10px] border border-[#dbe5ef] bg-white px-3 text-[15px] text-[#0f172a] outline-none transition-colors duration-200 placeholder:text-[#94a3b8] focus:border-[#86e6fa]"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function AddressCard({
  address,
  badge,
  description,
  editing,
  onCancel,
  onChange,
  onEdit,
  onSave,
  onSelect,
  saveLabel,
  selected,
  title,
}: {
  address: AddressDetails;
  badge?: string;
  description?: string;
  editing: boolean;
  onCancel: () => void;
  onChange: (field: keyof AddressDetails, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onSelect: () => void;
  saveLabel: string;
  selected: boolean;
  title: string;
}) {
  return (
    <div
      className={[
        "rounded-[14px] border p-5 shadow-[0px_4px_4px_rgba(0,0,0,0.18),0px_0px_0px_4px_rgba(134,230,250,0.05),0px_1px_2px_rgba(0,0,0,0.05)]",
        selected ? "border-[#86e6fa] bg-[rgba(174,214,255,0.2)]" : "border-[#e2e8f0] bg-white",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div className="inline-flex size-12 items-center justify-center rounded-[8px] bg-[rgba(134,230,250,0.2)] text-[#67e8f9]">
          {title === "Home Address" ? (
            <House className="size-[18px]" strokeWidth={2} />
          ) : (
            <MapPinned className="size-[18px]" strokeWidth={2} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[16px] font-bold leading-4 text-[#0f172a]">{title}</h2>
            {badge ? (
              <span className="rounded-[4px] bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#22c55e]">
                {badge}
              </span>
            ) : null}
          </div>
          {description ? (
            <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.04em] text-[#94a3b8]">
              {description}
            </p>
          ) : null}

          {editing ? (
            <div className="mt-5 space-y-4 rounded-[14px] border border-[#dbe5ef] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="grid gap-4 md:grid-cols-2">
                <AddressField
                  label="Full Name"
                  onChange={(value) => onChange("name", value)}
                  value={address.name}
                />
                <AddressField
                  label="Phone"
                  onChange={(value) => onChange("phone", value)}
                  value={address.phone}
                />
              </div>
              <div className="grid gap-4">
                <AddressField
                  label="Address Line 1"
                  onChange={(value) => onChange("line1", value)}
                  value={address.line1}
                />
                <AddressField
                  label="Address Line 2"
                  onChange={(value) => onChange("line2", value)}
                  value={address.line2}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AddressField
                  label="City"
                  onChange={(value) => onChange("city", value)}
                  value={address.city}
                />
                <AddressField
                  label="Postcode"
                  onChange={(value) => onChange("postcode", value)}
                  value={address.postcode}
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-[13px] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={onSave}
                  type="button"
                >
                  {saveLabel}
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full border border-[#cbd5e1] bg-white px-5 py-2.5 text-[13px] font-bold text-[#475569] transition-transform duration-200 hover:-translate-y-0.5"
                  onClick={onCancel}
                  type="button"
                >
                  <X className="mr-1.5 size-4" strokeWidth={2.2} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-2 text-[14px] leading-5 text-[#475569]">
                {address.name} {" - "} {address.phone}
              </p>
              <div className="mt-1 text-[14px] leading-[22.75px] text-[#475569]">
                {formatAddress(address).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 text-[12px] font-bold leading-4 text-[#64748b] transition-colors duration-200 hover:text-[#0f172a]"
                  onClick={onEdit}
                  type="button"
                >
                  <PencilLine className="size-3.5" strokeWidth={2.3} />
                  Edit Details
                </button>
                {!selected ? (
                  <button
                    className="inline-flex items-center justify-center rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-[12px] font-bold text-[#0f172a] transition-transform duration-200 hover:-translate-y-0.5"
                    onClick={onSelect}
                    type="button"
                  >
                    Deliver Here
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
        {selected && !editing ? (
          <CheckCircle2 className="size-5 text-[#67e8f9]" strokeWidth={2.2} />
        ) : null}
      </div>
    </div>
  );
}

export function CheckoutStep2Page() {
  const [quantity] = useCheckoutQuantity();
  const [deliveryMethod, setDeliveryMethod] = useCheckoutDeliveryMethod();
  const [selectedAddress, setSelectedAddress] = useState<AddressChoice>(() => {
    const savedChoice = readStoredAddressChoice();
    const savedAlternate = readStoredAddress(CHECKOUT_ALTERNATE_ADDRESS_STORAGE_KEY);

    return savedChoice === "alternate" && savedAlternate ? "alternate" : "home";
  });
  const [homeAddress, setHomeAddress] = useState<AddressDetails>(
    () => readStoredAddress(CHECKOUT_HOME_ADDRESS_STORAGE_KEY) ?? initialHomeAddress,
  );
  const [homeDraft, setHomeDraft] = useState<AddressDetails>(
    () => readStoredAddress(CHECKOUT_HOME_ADDRESS_STORAGE_KEY) ?? initialHomeAddress,
  );
  const [alternateAddress, setAlternateAddress] = useState<AddressDetails | null>(
    () => readStoredAddress(CHECKOUT_ALTERNATE_ADDRESS_STORAGE_KEY),
  );
  const [alternateDraft, setAlternateDraft] = useState<AddressDetails>(
    () => readStoredAddress(CHECKOUT_ALTERNATE_ADDRESS_STORAGE_KEY) ?? emptyAddress,
  );
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [isEditingAlternate, setIsEditingAlternate] = useState(false);

  const shippingPrice =
    deliveryMethod === "standard" ? standardShippingPrice : expressShippingPrice;
  const shippingTitle = deliveryMethod === "standard" ? "Standard" : "Express";

  useEffect(() => {
    writeStoredAddress(CHECKOUT_HOME_ADDRESS_STORAGE_KEY, homeAddress);
  }, [homeAddress]);

  useEffect(() => {
    writeStoredAddress(CHECKOUT_ALTERNATE_ADDRESS_STORAGE_KEY, alternateAddress);
  }, [alternateAddress]);

  useEffect(() => {
    if (selectedAddress === "alternate" && !alternateAddress) {
      setSelectedAddress("home");
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(CHECKOUT_SELECTED_ADDRESS_STORAGE_KEY, selectedAddress);
    }
  }, [alternateAddress, selectedAddress]);

  const updateHomeDraft = (field: keyof AddressDetails, value: string) => {
    setHomeDraft((current) => ({ ...current, [field]: value }));
  };

  const updateAlternateDraft = (field: keyof AddressDetails, value: string) => {
    setAlternateDraft((current) => ({ ...current, [field]: value }));
  };

  const openHomeEditor = () => {
    setHomeDraft(homeAddress);
    setIsEditingHome(true);
  };

  const saveHomeAddress = () => {
    setHomeAddress(homeDraft);
    setSelectedAddress("home");
    setIsEditingHome(false);
  };

  const cancelHomeEditor = () => {
    setHomeDraft(homeAddress);
    setIsEditingHome(false);
  };

  const openAlternateEditor = () => {
    setAlternateDraft(alternateAddress ?? emptyAddress);
    setIsEditingAlternate(true);
  };

  const saveAlternateAddress = () => {
    setAlternateAddress(alternateDraft);
    setSelectedAddress("alternate");
    setIsEditingAlternate(false);
  };

  const cancelAlternateEditor = () => {
    setAlternateDraft(alternateAddress ?? emptyAddress);
    setIsEditingAlternate(false);
  };

  return (
    <CheckoutPageFrame
      aside={
        <Step2Summary
          quantity={quantity}
          shippingPrice={shippingPrice}
          shippingTitle={shippingTitle}
        />
      }
      backHref="/checkout"
      backLabel="Back to Cart"
      progress={66}
      stepLabel="Step 2 of 3: Shipping"
    >
      <section>
        <h1 className="text-[36px] font-extrabold leading-10 tracking-[-0.9px] text-[#0f172a]">
          Shipping Address
        </h1>

        <div className="mt-4 space-y-4">
          <AddressCard
            address={homeDraft}
            badge="Default"
            editing={isEditingHome}
            onCancel={cancelHomeEditor}
            onChange={updateHomeDraft}
            onEdit={openHomeEditor}
            onSave={saveHomeAddress}
            onSelect={() => setSelectedAddress("home")}
            saveLabel="Save Details"
            selected={selectedAddress === "home"}
            title="Home Address"
          />

          {alternateAddress && !isEditingAlternate ? (
            <AddressCard
              address={alternateAddress}
              description="Alternative delivery location"
              editing={false}
              onCancel={() => {}}
              onChange={() => {}}
              onEdit={openAlternateEditor}
              onSave={() => {}}
              onSelect={() => setSelectedAddress("alternate")}
              saveLabel="Save Location"
              selected={selectedAddress === "alternate"}
              title="Different Location"
            />
          ) : null}

          {isEditingAlternate ? (
            <AddressCard
              address={alternateDraft}
              description="Alternative delivery location"
              editing
              onCancel={cancelAlternateEditor}
              onChange={updateAlternateDraft}
              onEdit={() => {}}
              onSave={saveAlternateAddress}
              onSelect={() => setSelectedAddress("alternate")}
              saveLabel="Save Location"
              selected={selectedAddress === "alternate"}
              title="Different Location"
            />
          ) : !alternateAddress ? (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-[12px] border-2 border-dashed border-[#e2e8f0] px-6 py-8 text-[16px] font-bold leading-6 text-[#64748b] transition-colors duration-200 hover:border-[#c7dded] hover:text-[#475569]"
              onClick={openAlternateEditor}
              type="button"
            >
              <CirclePlus className="size-5" strokeWidth={2.2} />
              <span>Deliver to a different location</span>
            </button>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="text-[24px] font-extrabold leading-8 text-[#0f172a]">
          Delivery Method
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ShippingMethodCard
            deliveryMethod={deliveryMethod}
            onSelect={setDeliveryMethod}
            price="RM4.99"
            subtitle="3-5 Business Days"
            title="Standard Delivery"
            value="standard"
          />
          <ShippingMethodCard
            deliveryMethod={deliveryMethod}
            onSelect={setDeliveryMethod}
            price="RM12.50"
            subtitle="Next Day Delivery"
            title="Express Delivery"
            value="express"
          />
        </div>
      </section>
    </CheckoutPageFrame>
  );
}
