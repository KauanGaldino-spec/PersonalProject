// Shared formatting for delivery addresses. Used by the admin order card, the
// customer's order details and the pre-payment PIX summary — one implementation,
// so a driver never sees three different renderings of the same address.

export const digitsOnly = (value) => String(value ?? '').replace(/\D/g, '');

/** Full address for the delivery driver: "Rua X, 123 — Apto 4 — Centro, SP — CEP 01000-000" */
export const formatAddress = (address) => {
  if (!address) return '';

  const street = [address.street, address.number].filter(Boolean).join(', ');
  const complement = address.complement ? ` — ${address.complement}` : '';
  const districtCity = [address.district, address.city].filter(Boolean).join(', ');
  const zip = address.zip ? ` — CEP ${address.zip}` : '';

  return `${street}${complement} — ${districtCity}${zip}`;
};

/** Compact one-liner shown before payment ("Entregar em ..."). */
export const summarizeAddress = (address) => {
  if (!address) return '';

  return [
    [address.street, address.number].filter(Boolean).join(', '),
    address.complement,
    address.district,
    address.city,
  ].filter(Boolean).join(' — ');
};

/** True when the order carries everything the kitchen needs to deliver it. */
export const isDeliverable = (order) =>
  Boolean(
    order?.customer?.name &&
    order?.customer?.phone &&
    order?.address?.street &&
    order?.address?.number &&
    order?.address?.district &&
    order?.address?.city
  );
