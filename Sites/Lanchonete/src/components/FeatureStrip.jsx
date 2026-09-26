import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

const FEATURES = [
    { icon: Truck, title: 'Entrega Grátis', subtitle: 'Em pedidos acima de R$ 20' },
    { icon: RotateCcw, title: 'Troca Fácil', subtitle: 'Política de 7 dias' },
    { icon: ShieldCheck, title: 'Pagamento Seguro', subtitle: 'Checkout 100% seguro' },
    { icon: Headset, title: 'Suporte 24/7', subtitle: "Estamos aqui para ajudar" },
];

const FeatureStrip = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map(({ icon: Icon, title, subtitle }) => (
                    <div
                        key={title}
                        className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 shadow-sm backdrop-blur"
                        style={{ background: 'linear-gradient(135deg, #FFF7EC 0%, #FDECD6 100%)' }}
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-color)]/30 bg-white text-[var(--brand-color)]">
                            <Icon className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-sm font-bold text-[#1A1A1A]">{title}</p>
                            <p className="text-xs text-[#9E9E9E]">{subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureStrip;