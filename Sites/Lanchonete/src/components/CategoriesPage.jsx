import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CategoriesPage.css';

const CATEGORIES = [
  { id: 1, name: 'Hambúrgueres', count: 24, color: 'var(--brand-color)', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Pizzas', count: 18, color: '#E74C3C', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Massas', count: 15, color: '#F39C12', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Sushis', count: 21, color: '#E91E63', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
  { id: 5, name: 'Saladas', count: 12, color: '#27AE60', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80' },
  { id: 6, name: 'Sobremesas', count: 16, color: '#8E44AD', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80' },
  { id: 7, name: 'Bebidas', count: 20, color: '#3498DB', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80' },
  { id: 8, name: 'Frutos do Mar', count: 14, color: '#1ABC9C', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=500&q=80' },
  { id: 9, name: 'Carnes', count: 10, color: '#C0392B', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80' },
  { id: 10, name: 'Café da Manhã', count: 22, color: '#F1C40F', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80' },
  { id: 11, name: 'Asiática', count: 19, color: '#D35400', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80' },
  { id: 12, name: 'Mexicana', count: 13, color: '#16A085', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80' },
];

export default function CategoriesPage({ onNavigate }) {
  return (
    <div className="categories-page">
      <div className="categories-header">
        <div>
          <h2 className="categories-title">Categorias</h2>
          <p className="categories-subtitle">Explore {CATEGORIES.length} categorias deliciosas</p>
        </div>
      </div>

      <div className="categories-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="category-card"
            onClick={() => onNavigate?.('Menu')}
          >
            <div className="category-card-img-wrap">
              <img src={cat.image} alt={cat.name} loading="lazy" />
              <div className="category-card-overlay" style={{ background: `linear-gradient(135deg, ${cat.color}DD, ${cat.color}88)` }} />
              <div className="category-card-content">
                <h3 className="category-card-name">{cat.name}</h3>
                <p className="category-card-count">{cat.count} itens</p>
                <span className="category-card-arrow">
                  <ArrowRight className="category-arrow-icon" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
