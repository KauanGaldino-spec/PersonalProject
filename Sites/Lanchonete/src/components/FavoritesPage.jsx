import React from 'react';
import { Heart, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import './FavoritesPage.css';

export default function FavoritesPage({ favorites, onRemoveFavorite, onAddToCart, onNavigate }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="favorites-empty-icon">
          <Heart className="h-8 w-8" />
        </div>
        <h2>Nenhum favorito ainda!</h2>
        <p>Você ainda não adicionou nenhum prato aos seus favoritos.</p>
        <button className="favorites-empty-btn" onClick={() => onNavigate('Menu')}>
          Explorar Cardápio
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div className="favorites-title">
          <div className="favorites-icon-wrap">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h2>Seus Favoritos</h2>
            <p>Todos os pratos que você ama em um só lugar</p>
          </div>
        </div>
        <span className="favorites-count">{favorites.length} {favorites.length === 1 ? 'Item' : 'Itens'}</span>
      </div>

      <div className="favorites-grid">
        {favorites.map((item) => (
          <div className="favorites-card" key={item.id ?? item.name}>
            <div className="favorites-card-img-wrap">
              <img src={item.image} alt={item.name} />
              <button 
                className="favorites-remove-btn" 
                onClick={() => onRemoveFavorite(item)}
                title="Remover dos favoritos"
              >
                <Heart className="h-5 w-5" fill="currentColor" />
              </button>
            </div>
            <div className="favorites-card-body">
              {item.category && <div className="favorites-card-cat">{item.category}</div>}
              <h3 className="favorites-card-name">{item.name}</h3>
              {item.desc && <p className="favorites-card-desc">{item.desc}</p>}
              {item.subtitle && <p className="favorites-card-desc">{item.subtitle}</p>}
              <div className="favorites-card-footer">
                <span className="favorites-card-price">
                  {typeof item.price === 'number' ? `R$ ${item.price.toFixed(2)}` : `R$ ${parseFloat(item.price || 0).toFixed(2)}`}
                </span>
                {item.rating != null && (
                  <span className="favorites-card-rating">
                    <Star className="favorites-star" />
                    {item.rating}
                  </span>
                )}
              </div>
              <button 
                className="favorites-add-btn"
                onClick={() => {
                  onAddToCart({
                    id: item.id || item.name,
                    name: item.name,
                    price: typeof item.price === 'number' ? item.price : parseFloat(item.price.replace('R$', '')),
                    image: item.image,
                    // Carried over so the cart can refuse demo/fallback dishes.
                    isDemo: item.isDemo,
                  });
                }}
                disabled={Boolean(item.isDemo)}
                title={item.isDemo ? 'Item de demonstração — não pode ser pedido' : undefined}
              >
                <ShoppingBag className="h-4 w-4" />
                {item.isDemo ? 'Indisponível' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
