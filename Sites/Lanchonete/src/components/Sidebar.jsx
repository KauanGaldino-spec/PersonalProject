import React from 'react';
import {
    Home, BookOpen, LayoutGrid, Tag, CalendarCheck, ClipboardList, Star, HelpCircle, ArrowRight,
    ForkKnife, Settings
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Início', id: 'Home', icon: Home },
    { label: 'Cardápio', id: 'Menu', icon: BookOpen },
    { label: 'Categorias', id: 'Categories', icon: LayoutGrid },
    { label: 'Ofertas', id: 'Offers', icon: Tag },
    { label: 'Reservas', id: 'Reservations', icon: CalendarCheck },
    { label: 'Pedidos', id: 'Orders', icon: ClipboardList },
    { label: 'Avaliações', id: 'Reviews', icon: Star },
    { label: 'Suporte', id: 'Support', icon: HelpCircle },
];

// Lightweight inline SVG illustration -- no image file, no import, no network needed.
const PromoIllustration = () => (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="h-40 w-full">
        <defs>
            <radialGradient id="plateGlow" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFE3CC" />
                <stop offset="100%" stopColor="#FFB877" />
            </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#plateGlow)" />
        <ellipse cx="200" cy="150" rx="150" ry="18" fill="#E8935A" opacity="0.35" />
        <circle cx="200" cy="95" r="78" fill="#FFFFFF" />
        <circle cx="200" cy="95" r="66" fill="#FFF6EC" />
        <ellipse cx="180" cy="80" rx="34" ry="20" fill="#F2B84B" />
        <ellipse cx="228" cy="92" rx="26" ry="16" fill="#E8633B" />
        <ellipse cx="188" cy="112" rx="22" ry="14" fill="#6FA96A" />
        <circle cx="160" cy="70" r="6" fill="#C0392B" />
        <circle cx="245" cy="75" r="5" fill="#C0392B" />
        <circle cx="205" cy="65" r="4" fill="#7FB06B" />
        <path d="M120 60 q6 -14 14 -2" stroke="#6FA96A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M265 55 q6 -14 14 -2" stroke="#6FA96A" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

const PromoCard = ({ onNavigate }) => (
    <div className="relative mt-6 overflow-hidden rounded-2xl">
        <PromoIllustration />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-color)] via-[var(--brand-color)]/80 to-[var(--brand-color)]/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
            <p className="text-sm font-semibold leading-snug text-white">
                Ganhe 20% OFF
                <br />
                no seu primeiro pedido
            </p>
            <button
                onClick={() => onNavigate?.('Offers')}
                className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[var(--brand-color)] transition hover:bg-white/90"
            >
                Pedir Agora
                <ArrowRight className="h-3.5 w-3.5" />
            </button>
        </div>
    </div>
);

const Sidebar = ({ active = 'Home', onNavigate, isAdmin, restaurantName = 'TasteHouse' }) => {
    return (
        <aside className="hidden w-56 shrink-0 flex-col border-r border-black/5 bg-white px-3 py-6 lg:flex">
            {/* Logo */}
            <a href="/" className="mb-6 flex items-center gap-2.5 px-4" onClick={(e) => { e.preventDefault(); onNavigate?.('Home'); }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-color)]">
                    <ForkKnife className="h-5 w-5 text-white" />
                </span>
                <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">{restaurantName}</span>
            </a>

            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ label, id, icon: Icon }) => {
                    const isActive = active === id;
                    return (
                        <button
                            key={id}
                            onClick={() => onNavigate?.(id)}
                            className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition ${isActive
                                ? 'bg-[var(--brand-color)] text-white shadow-md shadow-[var(--brand-color)]/30'
                                : 'text-[#5A5A5A] hover:bg-[#F7F7F7] hover:text-[#1A1A1A]'
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    );
                })}
                
                {/* Admin Panel button - Only visible to Admins */}
                {isAdmin && (
                    <button
                        onClick={() => onNavigate?.('Admin')}
                        className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold transition mt-4 border border-[var(--brand-color)]/20 ${
                            active === 'Admin'
                                ? 'bg-[var(--brand-color)] text-white shadow-md shadow-[var(--brand-color)]/30'
                                : 'text-[var(--brand-color)] hover:bg-[#FFF5F0]'
                        }`}
                    >
                        <Settings className="h-4 w-4" />
                        Painel Admin
                    </button>
                )}
            </nav>

            <PromoCard onNavigate={onNavigate} />
        </aside>
    );
};

export default Sidebar;