import React, { useState } from 'react';
import { Clock, Copy, Check, Percent, Gift, Zap, Truck } from 'lucide-react';
import './OffersPage.css';

// `expires` is an ISO date (YYYY-MM-DD) or null for permanent offers. It must stay
// machine-parsable — the expiry math below uses new Date(`${expires}T00:00:00`).
const OFFERS = [
  {
    id: 1,
    title: 'Especial Primeiro Pedido',
    desc: 'Ganhe 20% de desconto no seu primeiro pedido. Sem valor mínimo!',
    code: 'WELCOME20',
    discount: '20% OFF',
    icon: Gift,
    color: 'var(--brand-color)',
    bg: 'linear-gradient(135deg, var(--brand-color), #FF8F5A)',
    expires: '2026-12-31',
    minOrder: null,
  },
  {
    id: 2,
    title: 'Semana Entrega Grátis',
    desc: 'Aproveite entrega grátis em todos os pedidos acima de R$ 15 esta semana.',
    code: 'FREEDELIVERY',
    discount: 'ENTREGA GRÁTIS',
    icon: Truck,
    color: '#3498DB',
    bg: 'linear-gradient(135deg, #3498DB, #5DADE2)',
    expires: '2026-10-07',
    minOrder: 'R$ 15',
  },
  {
    id: 3,
    title: 'Oferta Relâmpago — 30% Off',
    desc: 'Desconto por tempo limitado em todos os hambúrgueres e pizzas. Corra!',
    code: 'FLASH30',
    discount: '30% OFF',
    icon: Zap,
    color: '#E74C3C',
    bg: 'linear-gradient(135deg, #E74C3C, #F1948A)',
    expires: '2026-10-02',
    minOrder: 'R$ 10',
  },
  {
    id: 4,
    title: 'Fim de Semana Especial',
    desc: 'R$ 5 de desconto em cada pedido no final de semana. Válido Sáb e Dom.',
    code: 'WEEKEND5',
    discount: 'R$ 5 OFF',
    icon: Percent,
    color: '#27AE60',
    bg: 'linear-gradient(135deg, #27AE60, #58D68D)',
    expires: '2026-11-30',
    minOrder: 'R$ 20',
  },
  {
    id: 5,
    title: 'Indique e Ganhe',
    desc: 'Convide um amigo e vocês dois ganham R$ 8 de desconto no próximo pedido.',
    code: 'REFER8',
    discount: 'R$ 8 OFF',
    icon: Gift,
    color: '#8E44AD',
    bg: 'linear-gradient(135deg, #8E44AD, #BB8FCE)',
    expires: null,
    minOrder: null,
  },
  {
    id: 6,
    title: 'Combo Econômico',
    desc: 'Compre 2 pratos principais + 1 bebida e ganhe 15% de desconto no combo inteiro.',
    code: 'COMBO15',
    discount: '15% OFF',
    icon: Percent,
    color: '#D35400',
    bg: 'linear-gradient(135deg, #D35400, #EB984E)',
    expires: '2026-10-15',
    minOrder: 'R$ 25',
  },
];

// "2026-10-07" -> "7 de out. de 2026"
const formatExpiry = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

function CopyButton({ code, disabled }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (disabled) return;
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (disabled) {
    return (
      <button className="offer-copy-btn offer-btn-expired" disabled>
        Expirado
      </button>
    );
  }

  return (
    <button className="offer-copy-btn" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="offer-copy-icon" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="offer-copy-icon" />
          Copiar Código
        </>
      )}
    </button>
  );
}

export default function OffersPage() {
  return (
    <div className="offers-page">
      <div className="offers-header">
        <h2 className="offers-title">Ofertas Especiais</h2>
        <p className="offers-subtitle">{OFFERS.length} ofertas ativas para economizar na sua próxima refeição</p>
      </div>

      <div className="offers-grid">
        {OFFERS.map((offer) => {
          const Icon = offer.icon;
          
          let isExpired = false;
          let isExpiringSoon = false;
          let daysLeft = null;

          if (offer.expires) {
            const expDate = new Date(`${offer.expires}T00:00:00`);
            const today = new Date();
            // Reset hours to compare purely by date
            today.setHours(0, 0, 0, 0);
            
            const diffTime = expDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
              isExpired = true;
            } else if (diffDays <= 7) {
              isExpiringSoon = true;
              daysLeft = diffDays;
            }
          }

          return (
            <div className={`offer-card ${isExpired ? 'offer-card--expired' : ''}`} key={offer.id}>
              {/* Accent banner */}
              <div className="offer-banner" style={{ background: isExpired ? '#9E9E9E' : offer.bg }}>
                <Icon className="offer-banner-icon" />
                <span className="offer-discount">{offer.discount}</span>
              </div>

              <div className="offer-body">
                <h3 className="offer-name">{offer.title}</h3>
                <p className="offer-desc">{offer.desc}</p>

                {/* Code pill */}
                <div className="offer-code-row">
                  <div className="offer-code-pill">
                    <span className="offer-code-label">Código:</span>
                    <span className={`offer-code-value ${isExpired ? 'offer-code-expired' : ''}`}>{offer.code}</span>
                  </div>
                  <CopyButton code={offer.code} disabled={isExpired} />
                </div>

                {/* Meta */}
                <div className="offer-meta">
                  <span className={`offer-meta-item ${isExpiringSoon ? 'offer-expiring-soon' : ''}`}>
                    <Clock className="offer-meta-icon" />
                    {isExpired
                      ? 'Expirado'
                      : isExpiringSoon
                        ? `Termina em ${daysLeft} ${daysLeft === 1 ? 'dia' : 'dias'}!`
                        : offer.expires
                          ? `Válido até ${formatExpiry(offer.expires)}`
                          : 'Oferta permanente'}
                  </span>
                  {offer.minOrder && (
                    <span className="offer-meta-item">
                      Pedido mínimo: {offer.minOrder}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
