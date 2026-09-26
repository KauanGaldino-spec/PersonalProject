import React, { useState } from 'react';
import {
  Home, BookOpen, LayoutGrid, Tag, CalendarCheck, ClipboardList, Star, HelpCircle,
  ArrowRight, X, ForkKnife, Settings,
} from 'lucide-react';
import './MobileMenu.css';

// `id` is the routing value compared against activePage in App.jsx — never
// translate it. `label` is the visible (Portuguese) text.
const NAV_ITEMS = [
  { id: 'Home', label: 'Início', icon: Home },
  { id: 'Menu', label: 'Cardápio', icon: BookOpen },
  { id: 'Categories', label: 'Categorias', icon: LayoutGrid },
  { id: 'Offers', label: 'Ofertas', icon: Tag },
  { id: 'Reservations', label: 'Reservas', icon: CalendarCheck },
  { id: 'Orders', label: 'Pedidos', icon: ClipboardList },
  { id: 'Reviews', label: 'Avaliações', icon: Star },
  { id: 'Support', label: 'Suporte', icon: HelpCircle },
];

export default function MobileMenu({ active = 'Home', onNavigate, isAdmin = false, restaurantName = 'TasteHouse' }) {
  const [open, setOpen] = useState(false);

  const goTo = (page) => {
    onNavigate?.(page);
    setOpen(false);
  };

  return (
    <>
      {/* Floating trigger button dock */}
      <div className="mobile-menu-dock">
        <button
          className="mobile-menu-trigger"
          onClick={() => setOpen(true)}
        >
          <BookOpen className="h-5 w-5" />
          Menu
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div className="mobile-menu-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Drawer panel */}
      <div className={`mobile-menu-drawer ${open ? 'mobile-menu-drawer--open' : ''}`}>
        {/* Drawer header */}
        <div className="mobile-menu-header">
          <a href="/" className="mobile-menu-logo">
            <span className="mobile-menu-logo-icon">
              <ForkKnife className="h-5 w-5 text-white" />
            </span>
            <span className="mobile-menu-logo-text">{restaurantName}</span>
          </a>
          <button className="mobile-menu-close" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mobile-menu-nav">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`mobile-menu-item ${isActive ? 'mobile-menu-item--active' : ''}`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            );
          })}

          {/* Admin panel entry - mirrors the desktop Sidebar */}
          {isAdmin && (
            <button
              onClick={() => goTo('Admin')}
              className={`mobile-menu-item ${active === 'Admin' ? 'mobile-menu-item--active' : ''}`}
            >
              <Settings className="h-5 w-5" />
              Painel Admin
            </button>
          )}
        </nav>

        {/* Promo card */}
        <div className="mobile-menu-promo">
          <p className="mobile-menu-promo-text">
            Ganhe 20% OFF<br />no seu primeiro pedido
          </p>
          <button className="mobile-menu-promo-btn" onClick={() => goTo('Offers')}>
            Pedir Agora
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}
