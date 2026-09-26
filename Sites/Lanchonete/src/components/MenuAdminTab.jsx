import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, deleteDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import './MenuAdminTab.css';

// The hardcoded items to seed the database
const INITIAL_MENU_ITEMS = [
  { name: 'Hambúrguer Zinger Apimentado', desc: 'Frango frito crocante com maionese picante e picles', price: 8.99, category: 'Hambúrgueres', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cheeseburger Clássico', desc: 'Hambúrguer de carne com cheddar, alface e tomate', price: 7.49, category: 'Hambúrgueres', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' },
  { name: 'Pizza Margherita', desc: 'Mussarela fresca, manjericão e tomates San Marzano', price: 10.99, category: 'Pizzas', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80' },
  { name: 'Macarrão Alfredo Cremoso', desc: 'Fettuccine em molho cremoso de parmesão', price: 11.49, category: 'Massas', image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Smoothie de Manga', desc: 'Manga fresca batida com iogurte e mel', price: 4.99, category: 'Bebidas', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=400&q=80' },
  { name: 'Petit Gâteau de Chocolate', desc: 'Bolo quente de chocolate com sorvete de baunilha', price: 6.99, category: 'Sobremesas', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80' },
];

export default function MenuAdminTab() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  
  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  useEffect(() => {
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const seedDatabase = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Importar Cardápio?',
      message: 'Isso irá adicionar os itens iniciais de demonstração ao seu banco de dados.',
      onConfirm: async () => {
        setLoading(true);
        for (const item of INITIAL_MENU_ITEMS) {
          await addDoc(collection(db, 'menuItems'), {
            ...item,
            rating: 5,
            reviews: 1,
          });
        }
        setLoading(false);
      }
    });
  };

  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Excluir Produto',
      message: 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
      onConfirm: async () => {
        await deleteDoc(doc(db, 'menuItems', id));
      }
    });
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (currentEditItem.id) {
      // Update existing
      const { id, ...data } = currentEditItem;
      await setDoc(doc(db, 'menuItems', id), data, { merge: true });
    } else {
      // Add new
      await addDoc(collection(db, 'menuItems'), {
        ...currentEditItem,
        rating: 5,
        reviews: 0
      });
    }
    setIsEditing(false);
    setCurrentEditItem(null);
  };

  const startEdit = (item) => {
    setCurrentEditItem(item);
    setIsEditing(true);
  };

  const startNew = () => {
    setCurrentEditItem({
      name: '',
      desc: '',
      price: '',
      category: 'Hambúrgueres',
      image: ''
    });
    setIsEditing(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando cardápio...</div>;

  return (
    <div className="menu-admin-tab">
      <div className="menu-admin-header">
        <h2 className="admin-section-title">Gerenciar Cardápio</h2>
        <div className="flex gap-3">
          {menuItems.length === 0 && (
            <button onClick={seedDatabase} className="btn-seed">
              Importar Cardápio Inicial
            </button>
          )}
          <button onClick={startNew} className="btn-add-item">
            <Plus className="w-5 h-5" /> Novo Produto
          </button>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="menu-edit-overlay">
          <div className="menu-edit-modal" style={{ maxWidth: '400px', padding: '1.5rem' }}>
            <div className="modal-header" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>{confirmModal.title}</h3>
            </div>
            <p style={{ color: '#5A5A5A', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {confirmModal.message}
            </p>
            <div className="modal-actions" style={{ marginTop: '0', paddingTop: '0', border: 'none' }}>
              <button 
                type="button" 
                onClick={() => setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null })} 
                className="btn-cancel"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
                }} 
                className="btn-save"
                style={{ background: confirmModal.title.includes('Excluir') ? '#DC2626' : 'var(--brand-color)' }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && currentEditItem && (
        <div className="menu-edit-overlay">
          <div className="menu-edit-modal">
            <div className="modal-header">
              <h3>{currentEditItem.id ? 'Editar Produto' : 'Novo Produto'}</h3>
              <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSaveItem} className="menu-edit-form">
              <div className="form-group">
                <label>Nome do Produto</label>
                <input 
                  type="text" 
                  value={currentEditItem.name} 
                  onChange={e => setCurrentEditItem({...currentEditItem, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea 
                  value={currentEditItem.desc} 
                  onChange={e => setCurrentEditItem({...currentEditItem, desc: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={currentEditItem.price} 
                    onChange={e => setCurrentEditItem({...currentEditItem, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select 
                    value={currentEditItem.category}
                    onChange={e => setCurrentEditItem({...currentEditItem, category: e.target.value})}
                  >
                    <option value="Hambúrgueres">Hambúrgueres</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Massas">Massas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Sobremesas">Sobremesas</option>
                    <option value="Saladas">Saladas</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>URL da Imagem</label>
                <div className="flex gap-2">
                  <ImageIcon className="text-gray-400 mt-2" />
                  <input 
                    type="url" 
                    value={currentEditItem.image} 
                    onChange={e => setCurrentEditItem({...currentEditItem, image: e.target.value})}
                    placeholder="https://exemplo.com/foto.jpg"
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save"><Save className="w-4 h-4" /> Salvar Produto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="menu-items-grid">
        {menuItems.map(item => (
          <div key={item.id} className="admin-menu-card">
            <img src={item.image} alt={item.name} className="admin-menu-img" />
            <div className="admin-menu-details">
              <span className="admin-menu-category">{item.category}</span>
              <h4>{item.name}</h4>
              <p className="admin-menu-price">R$ {parseFloat(item.price).toFixed(2)}</p>
              <div className="admin-menu-actions">
                <button onClick={() => startEdit(item)} className="btn-edit"><Edit2 className="w-4 h-4" /> Editar</button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete"><Trash2 className="w-4 h-4" /> Excluir</button>
              </div>
            </div>
          </div>
        ))}
        {menuItems.length === 0 && (
          <div className="empty-menu-state">
            <p>Seu cardápio está vazio!</p>
            <p className="text-sm text-gray-500">Clique em "Importar Cardápio Inicial" ou adicione produtos manualmente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
