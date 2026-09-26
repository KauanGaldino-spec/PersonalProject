import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { collection, query, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { isFavorite } from '../utils/items';
import './PopularDishes.css';

// Fallback data if DB is empty
const FALLBACK_DISHES = [
  {
    id: 'f1',
    name: 'Frango Grelhado com Legumes',
    subtitle: 'Saudável',
    price: 12.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80',
    badge: 'Mais Vendido',
    badgeType: 'bestseller',
  },
  {
    id: 'f2',
    name: 'Pizza Margherita',
    subtitle: 'Clássica',
    price: 10.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
    badge: '15% OFF',
    badgeType: 'discount',
  },
  {
    id: 'f3',
    name: 'Petit Gâteau de Chocolate',
    subtitle: 'com Sorvete',
    price: 6.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
    badge: '20% OFF',
    badgeType: 'discount',
  },
];

const COLORS = ['#e7efe3', '#fdf1cf', '#fbe9dd', '#e7efe3', '#fbe4e1'];

export default function PopularDishes({ favorites = [], onToggleFavorite, onAddToCart, onNavigate }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'menuItems'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Demo data so the home carousel isn't empty. Flagged so it can never be
        // ordered (see App.addToCart and the disabled button below).
        setDishes(FALLBACK_DISHES.map((item) => ({ ...item, isDemo: true })));
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDishes(items);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="popular-section">
      <div className="popular-header">
        <h2>Pratos Populares</h2>
        <button onClick={() => onNavigate?.('Menu')} className="popular-view-all">
          Ver Todos <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="popular-grid">
        {dishes.map((dish, idx) => {
          const bg = COLORS[idx % COLORS.length];
          return (
            <div className="popular-card" key={dish.id || dish.name}>
              {/* Image area */}
              <div className="popular-card-img-wrap" style={{ backgroundColor: bg }}>
                <span className={`popular-badge popular-badge--${dish.badgeType || 'bestseller'}`}>
                  {dish.badge || (dish.tag === 'bestseller' ? 'Mais Vendido' : dish.tag)}
                </span>
                {!dish.isDemo && (
                  <button 
                    className="popular-favorite-btn"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(dish); }}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isFavorite(favorites, dish) ? 'popular-heart-active' : 'popular-heart-inactive'}`} 
                    />
                  </button>
                )}
                <img src={dish.image} alt={dish.name} />
              </div>

              {/* Info */}
              <div className="popular-card-info">
                <h3>{dish.name}</h3>
                <p className="popular-card-sub">{dish.category || dish.subtitle}</p>

                <div className="popular-card-footer">
                  <span className="popular-card-price">R$ {parseFloat(dish.price).toFixed(2)}</span>
                  {dish.isDemo ? (
                    <span className="popular-demo-tag" title="Item de demonstração — não pode ser pedido">
                      Exemplo
                    </span>
                  ) : (
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart?.(dish); }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-color)] text-white transition hover:bg-[var(--brand-color-dark)]"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
