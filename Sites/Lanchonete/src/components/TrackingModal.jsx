import React, { useEffect, useState } from 'react';
import { X, MapPin, Clock, ChefHat, CheckCircle, Package, XCircle } from 'lucide-react';
import './TrackingModal.css';

// Average kitchen + delivery time used to estimate the arrival window.
const ETA_MINUTES = 40;

const STEPS = [
  { key: 'preparing', icon: ChefHat, title: 'Preparando seu pedido', desc: 'O restaurante está preparando sua comida.' },
  { key: 'transit', icon: Package, title: 'A caminho', desc: 'O entregador está a caminho.' },
  { key: 'delivered', icon: CheckCircle, title: 'Entregue', desc: 'Aproveite sua refeição!' },
];

// Explicit status -> step mapping so an unexpected status (e.g. 'pending' or
// 'cancelled') never silently renders as "Entregue".
const STATUS_STEP = {
  pending: 0,
  preparing: 1,
  transit: 2,
  delivered: 3,
};

const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export default function TrackingModal({ order, onClose }) {
  const [now, setNow] = useState(() => Date.now());

  // Keep the ETA fresh while the modal is open (and unmount cleanly).
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (!order) return null;

  const status = order.status || 'pending';
  const isCancelled = status === 'cancelled';
  const currentStep = STATUS_STEP[status] ?? 0;

  const createdAt = toDate(order.createdAt);
  const eta = createdAt ? new Date(createdAt.getTime() + ETA_MINUTES * 60000) : null;
  const minutesLeft = eta ? Math.max(0, Math.round((eta.getTime() - now) / 60000)) : null;

  let etaLabel = `Chegando em ~${ETA_MINUTES} min`;
  if (status === 'delivered') etaLabel = 'Pedido entregue';
  else if (isCancelled) etaLabel = 'Pedido cancelado';
  else if (minutesLeft !== null) {
    etaLabel = minutesLeft <= 0 ? 'Chegando a qualquer momento' : `Chegando em ~${minutesLeft} min`;
  }

  const shortId = String(order.id ?? '').slice(0, 6).toUpperCase();

  return (
    <div className="tracking-modal-overlay" onClick={onClose}>
      <div className="tracking-modal-content" onClick={e => e.stopPropagation()}>
        <button className="tracking-close-btn" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div className="tracking-header">
          <h2>Acompanhe Seu Pedido</h2>
          {shortId && <p>Pedido: ORD-{shortId}</p>}
        </div>

        {isCancelled ? (
          <div className="tracking-cancelled">
            <XCircle className="w-8 h-8" />
            <h4>Este pedido foi cancelado</h4>
            <p>Se você não solicitou o cancelamento, fale com o nosso suporte.</p>
          </div>
        ) : (
          <>
            {/* Map Placeholder */}
            <div className="tracking-map-placeholder">
              <div className="map-route">
                <div className="map-pin restaurant-pin">
                  <ChefHat className="w-4 h-4 text-white" />
                </div>
                <div className="map-line"></div>
                <div className="map-pin user-pin">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="tracking-eta">
                <Clock className="w-4 h-4 text-[var(--brand-color)]" />
                <span>{etaLabel}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="tracking-timeline">
              {STEPS.map((step, idx) => {
                const stepNumber = idx + 1;
                const Icon = step.icon;
                const completed = currentStep >= stepNumber;
                const active = currentStep === stepNumber;

                return (
                  <React.Fragment key={step.key}>
                    {idx > 0 && <div className="timeline-connector" />}
                    <div className={`timeline-step ${completed ? 'completed' : ''} ${active ? 'active' : ''}`}>
                      <div className="step-icon"><Icon className="w-4 h-4" /></div>
                      <div className="step-info">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
