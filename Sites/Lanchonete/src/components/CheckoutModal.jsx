import React, { useState, useEffect } from 'react';
import { X, MapPin, Bike } from 'lucide-react';
import './CheckoutModal.css';

const EMPTY = {
  name: '', phone: '', zip: '', street: '', number: '', complement: '', district: '', city: '',
};

const onlyDigits = (value) => value.replace(/\D/g, '');

const Field = ({ label, full = false, children }) => (
  <label className={`checkout-field ${full ? 'checkout-field--full' : ''}`}>
    <span className="checkout-label">{label}</span>
    {children}
  </label>
);

/**
 * Delivery details, collected before payment. Nothing is written to Firestore here —
 * `onSubmit` hands the data back to App, which stores it on the order.
 */
export default function CheckoutModal({ isOpen, onClose, onSubmit, initialData, total = 0 }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  // Prefill with the address used last time (stored on the user document).
  useEffect(() => {
    if (!isOpen) return;
    setForm({ ...EMPTY, ...(initialData || {}) });
    setError('');
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleaned = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      zip: form.zip.trim(),
      street: form.street.trim(),
      number: form.number.trim(),
      complement: form.complement.trim(),
      district: form.district.trim(),
      city: form.city.trim(),
    };

    if (onlyDigits(cleaned.phone).length < 10) {
      setError('Informe um telefone válido com DDD (ex.: (11) 91234-5678).');
      return;
    }

    if (onlyDigits(cleaned.zip).length !== 8) {
      setError('Informe um CEP válido com 8 dígitos.');
      return;
    }

    setError('');
    onSubmit({
      customer: { name: cleaned.name, phone: cleaned.phone },
      address: {
        zip: cleaned.zip,
        street: cleaned.street,
        number: cleaned.number,
        complement: cleaned.complement,
        district: cleaned.district,
        city: cleaned.city,
      },
      savedAddress: cleaned,
    });
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(event) => event.stopPropagation()}>
        <button className="checkout-close-btn" onClick={onClose} aria-label="Fechar">
          <X className="w-5 h-5" />
        </button>

        <div className="checkout-header">
          <div className="checkout-icon-wrap">
            <Bike className="w-6 h-6" />
          </div>
          <h2>Dados de Entrega</h2>
          <p>Informe onde devemos entregar seu pedido.</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <Field label="Nome completo" full>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Como devemos chamar você?"
              autoComplete="name"
              maxLength={120}
              required
            />
          </Field>

          <Field label="Telefone / WhatsApp">
            <input
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              placeholder="(11) 91234-5678"
              autoComplete="tel"
              maxLength={20}
              required
            />
          </Field>

          <Field label="CEP">
            <input
              type="text"
              value={form.zip}
              onChange={update('zip')}
              placeholder="00000-000"
              autoComplete="postal-code"
              maxLength={12}
              required
            />
          </Field>

          <Field label="Rua / Avenida" full>
            <input
              type="text"
              value={form.street}
              onChange={update('street')}
              placeholder="Rua das Flores"
              autoComplete="address-line1"
              maxLength={160}
              required
            />
          </Field>

          <Field label="Número">
            <input
              type="text"
              value={form.number}
              onChange={update('number')}
              placeholder="123"
              maxLength={20}
              required
            />
          </Field>

          <Field label="Complemento (opcional)">
            <input
              type="text"
              value={form.complement}
              onChange={update('complement')}
              placeholder="Apto 42, bloco B"
              maxLength={120}
            />
          </Field>

          <Field label="Bairro">
            <input
              type="text"
              value={form.district}
              onChange={update('district')}
              placeholder="Centro"
              maxLength={80}
              required
            />
          </Field>

          <Field label="Cidade">
            <input
              type="text"
              value={form.city}
              onChange={update('city')}
              placeholder="São Paulo"
              autoComplete="address-level2"
              maxLength={80}
              required
            />
          </Field>

          {error && <p className="checkout-error checkout-field--full">{error}</p>}

          <div className="checkout-footer checkout-field--full">
            <div className="checkout-total">
              <MapPin className="w-4 h-4" />
              <span>Total com entrega</span>
              <strong>R$ {total.toFixed(2)}</strong>
            </div>

            <div className="checkout-actions">
              <button type="button" className="checkout-btn checkout-btn--ghost" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="checkout-btn checkout-btn--primary">
                Continuar para pagamento
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

