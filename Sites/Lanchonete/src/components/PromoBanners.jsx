import React from 'react';
import { ArrowRight } from 'lucide-react';
import './PromoBanners.css';

const banners = [
  {
    tag: 'OFERTA POR TEMPO LIMITADO',
    tagColor: '#27ae60',
    title: '30% DE DESCONTO',
    titleHighlight: 'No Seu Primeiro Pedido!',
    subtitle: 'Use o código TASTY30 e aproveite.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    bg: 'linear-gradient(135deg, #e8f5e1 0%, #f0f9eb 100%)',
    btnBg: '#27ae60',
    btnHover: '#219150',
  },
  {
    tag: 'ESPECIAL FIM DE SEMANA',
    tagColor: '#ff6b2b',
    title: 'Combos para a Família',
    titleHighlight: '',
    subtitle: 'Alimente sua família com nossos combos especiais.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    bg: 'linear-gradient(135deg, #fef9f0 0%, #fdf1e0 100%)',
    btnBg: '#ff6b2b',
    btnHover: '#ff5a1a',
  },
];

export default function PromoBanners({ onNavigate }) {
  return (
    <section className="promo-section">
      <div className="promo-grid">
        {banners.map((banner) => (
          <div
            className="promo-banner"
            key={banner.title}
            style={{ background: banner.bg }}
          >
            {/* Decorative dots */}
            <div className="promo-dots promo-dots--tl" />
            <div className="promo-dots promo-dots--br" />

            <div className="promo-content">
              <span
                className="promo-tag"
                style={{ backgroundColor: banner.tagColor }}
              >
                {banner.tag}
              </span>

              <h3 className="promo-title">
                {banner.title}
                {banner.titleHighlight && (
                  <>
                    <br />
                    {banner.titleHighlight}
                  </>
                )}
              </h3>

              <p className="promo-subtitle">{banner.subtitle}</p>

              <button
                className="promo-btn"
                onClick={() => onNavigate?.('Offers')}
                style={{
                  '--btn-bg': banner.btnBg,
                  '--btn-hover': banner.btnHover,
                }}
              >
                Pedir Agora
                <ArrowRight className="promo-btn-icon" />
              </button>
            </div>

            <div className="promo-img-wrap">
              <img src={banner.image} alt={banner.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
