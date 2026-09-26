import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Star, Plus, Flame, Leaf, Check, Heart, Loader2 } from 'lucide-react';
import { isFavorite } from '../utils/items';
import './MenuPage.css';

const CATEGORIES = ['Tudo', 'Hambúrgueres', 'Pizzas', 'Massas', 'Bebidas', 'Sobremesas', 'Saladas'];

const FALLBACK_ITEMS = [
  // Burgers
  { id: 1, name: 'Hambúrguer Zinger Apimentado', desc: 'Frango frito crocante com maionese picante e picles', price: 8.99, rating: 4.8, reviews: 234, category: 'Hambúrgueres', tag: 'bestseller', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Cheeseburger Clássico', desc: 'Hambúrguer de carne com cheddar, alface e tomate', price: 7.49, rating: 4.6, reviews: 189, category: 'Hambúrgueres', tag: null, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Hambúrguer BBQ com Bacon', desc: 'Molho BBQ defumado, bacon crocante e anéis de cebola', price: 10.99, rating: 4.9, reviews: 312, category: 'Hambúrgueres', tag: 'spicy', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80' },

  // Pizza
  { id: 4, name: 'Pizza Margherita', desc: 'Mussarela fresca, manjericão e tomates San Marzano', price: 10.99, rating: 4.7, reviews: 278, category: 'Pizzas', tag: 'bestseller', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Pepperoni Supreme', desc: 'Dobro de pepperoni com mussarela e orégano', price: 12.99, rating: 4.8, reviews: 195, category: 'Pizzas', tag: null, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'Pizza de Frango com BBQ', desc: 'Frango grelhado, cebola roxa e molho BBQ', price: 13.49, rating: 4.5, reviews: 156, category: 'Pizzas', tag: 'spicy', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80' },

  // Pasta
  { id: 7, name: 'Macarrão Alfredo Cremoso', desc: 'Fettuccine em molho cremoso de parmesão', price: 11.49, rating: 4.6, reviews: 167, category: 'Massas', tag: null, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'Espaguete à Bolonhesa', desc: 'Ragú de carne com parmesão', price: 10.49, rating: 4.7, reviews: 213, category: 'Massas', tag: 'bestseller', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'Penne Arrabbiata', desc: 'Molho de tomate apimentado com alho e pimenta', price: 9.99, rating: 4.4, reviews: 98, category: 'Massas', tag: 'spicy', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80' },

  // Drinks
  { id: 10, name: 'Smoothie de Manga', desc: 'Manga fresca batida com iogurte e mel', price: 4.99, rating: 4.8, reviews: 142, category: 'Bebidas', tag: null, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80' },
  { id: 11, name: 'Latte Gelado de Caramelo', desc: 'Expresso com xarope de caramelo e leite frio', price: 5.49, rating: 4.5, reviews: 188, category: 'Bebidas', tag: 'bestseller', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80' },
  { id: 12, name: 'Limonada Refrescante', desc: 'Limonada espremida na hora com hortelã', price: 3.99, rating: 4.6, reviews: 76, category: 'Bebidas', tag: 'vegan', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' },

  // Desserts
  { id: 13, name: 'Petit Gâteau de Chocolate', desc: 'Bolo quente de chocolate com sorvete de baunilha', price: 6.99, rating: 4.9, reviews: 321, category: 'Sobremesas', tag: 'bestseller', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
  { id: 14, name: 'Tiramisu', desc: 'Clássica sobremesa italiana de café', price: 7.49, rating: 4.7, reviews: 198, category: 'Sobremesas', tag: null, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80' },
  { id: 15, name: 'Crème Brûlée', desc: 'Creme de baunilha com crosta de caramelo', price: 6.49, rating: 4.8, reviews: 145, category: 'Sobremesas', tag: null, image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=400&q=80' },

  // Salads
  { id: 16, name: 'Salada Caesar', desc: 'Alface romana, parmesão, croutons e molho Caesar', price: 8.49, rating: 4.5, reviews: 112, category: 'Saladas', tag: null, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80' },
  { id: 17, name: 'Salada Grega', desc: 'Feta, azeitonas, pepino, tomate e cebola roxa', price: 7.99, rating: 4.6, reviews: 89, category: 'Saladas', tag: 'vegan', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
  { id: 18, name: 'Salada com Frango Grelhado', desc: 'Folhas verdes com frango grelhado e abacate', price: 9.99, rating: 4.7, reviews: 176, category: 'Saladas', tag: null, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80' },
];

const TagBadge = ({ tag }) => {
  if (!tag) return null;
  const config = {
    bestseller: { label: 'Mais Vendido', className: 'menu-tag--bestseller' },
    spicy: { label: 'Apimentado', className: 'menu-tag--spicy', icon: Flame },
    vegan: { label: 'Vegano', className: 'menu-tag--vegan', icon: Leaf },
  };
  const t = config[tag];
  if (!t) return null;
  return (
    <span className={`menu-tag ${t.className}`}>
      {t.icon && <t.icon className="menu-tag-icon" />}
      {t.label}
    </span>
  );
};

function AddToCartButton({ item, onAdd }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAdd?.(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Demo/fallback dishes are placeholders for an empty menu and must not be ordered.
  if (item?.isDemo) {
    return (
      <button className="menu-add-btn menu-add-btn--disabled" disabled title="Item de demonstração — cadastre o cardápio real para poder vender">
        <Plus className="menu-add-icon" />
        Indisponível
      </button>
    );
  }

  return (
    <button
      className={`menu-add-btn ${added ? 'menu-add-btn--added' : ''}`}
      onClick={handleClick}
      disabled={added}
    >
      {added ? (
        <>
          <Check className="menu-add-icon" />
          Adicionado!
        </>
      ) : (
        <>
          <Plus className="menu-add-icon" />
          Adicionar ao Carrinho
        </>
      )}
    </button>
  );
}

export default function MenuPage({ onAddToCart, favorites = [], onToggleFavorite, searchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Demo data so an empty menu doesn't look broken. Flagged so it can never
        // be added to the cart (see App.addToCart and AddToCartButton).
        setMenuItems(FALLBACK_ITEMS.map((item) => ({ ...item, isDemo: true })));
      } else {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isLoading = loading && menuItems.length === 0;
  const hasDemoItems = menuItems.some((item) => item.isDemo);

  const filteredByCategory = activeCategory === 'Tudo'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const filtered = filteredByCategory.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = item.name?.toLowerCase().includes(searchLower);
    const descMatch = item.desc?.toLowerCase().includes(searchLower);
    return nameMatch || descMatch;
  });

  if (isLoading) {
    return (
      <div className="menu-page flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-color)]" />
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-page-header">
        <div>
          <h2 className="menu-page-title">Nosso Cardápio</h2>
          <p className="menu-page-subtitle">{filtered.length} deliciosas opções para escolher</p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="menu-tabs-wrap">
        <div className="menu-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`menu-tab ${activeCategory === cat ? 'menu-tab--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Demo notice: this content is not orderable */}
      {hasDemoItems && (
        <div className="menu-demo-notice">
          <strong>Cardápio de demonstração</strong>
          <span>
            Estes pratos são exemplos e <strong>não podem ser pedidos</strong>. Um administrador
            precisa cadastrar o cardápio real em <em>Painel Admin → Cardápio</em>.
          </span>
        </div>
      )}

      {/* Grid */}
      <div className="menu-grid">
        {filtered.map((item) => (
          <div className="menu-card" key={item.id}>
            <div className="menu-card-img-wrap">
              <TagBadge tag={item.tag} />
              {!item.isDemo && (
                <button 
                  className="menu-favorite-btn"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite?.(item); }}
                  title={isFavorite(favorites, item) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart 
                    className={`h-5 w-5 ${isFavorite(favorites, item) ? 'menu-heart-active' : 'menu-heart-inactive'}`} 
                  />
                </button>
              )}
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div className="menu-card-body">
              <div className="menu-card-cat">{item.category}</div>
              <h3 className="menu-card-name">{item.name}</h3>
              <p className="menu-card-desc">{item.desc}</p>
              <div className="menu-card-footer">
                <span className="menu-card-price">R$ {parseFloat(item.price).toFixed(2)}</span>
                {item.rating != null && (
                  <span className="menu-card-rating">
                    <Star className="menu-star" />
                    {item.rating}
                    {item.reviews != null && (
                      <span className="menu-card-reviews">({item.reviews})</span>
                    )}
                  </span>
                )}
              </div>
              <AddToCartButton item={item} onAdd={onAddToCart} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

