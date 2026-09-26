import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Package, Clock, CheckCircle, Truck, DollarSign, TrendingUp, ChefHat, LayoutGrid, ClipboardList, Settings, CalendarCheck, MessageSquare, Star, MapPin, Phone, Copy, Check, MessageCircle } from 'lucide-react';
import MenuAdminTab from './MenuAdminTab';
import SettingsAdminTab from './SettingsAdminTab';
import ReservationsAdminTab from './ReservationsAdminTab';
import SupportAdminTab from './SupportAdminTab';
import ReviewsAdminTab from './ReviewsAdminTab';
import { formatAddress, digitsOnly } from '../utils/address';
import './AdminDashboard.css';

export default function AdminDashboard({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  // Lightweight counters so pending work is visible from any tab.
  const [pendingReservations, setPendingReservations] = useState(0);
  const [openMessages, setOpenMessages] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const copyAddress = async (order) => {
    const text = [
      order.customer?.name,
      formatAddress(order.address),
      order.customer?.phone ? `Tel: ${order.customer.phone}` : null,
    ].filter(Boolean).join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(order.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Could not copy the address:', err);
    }
  };

  useEffect(() => {
    // Listen to all orders in real-time
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Pending table bookings (single-field filter -> no composite index needed).
    const unsubReservations = onSnapshot(
      query(collection(db, 'reservations'), where('status', '==', 'pending')),
      (snapshot) => setPendingReservations(snapshot.size),
      (err) => console.error('Error counting reservations:', err)
    );

    const unsubMessages = onSnapshot(
      query(collection(db, 'supportMessages'), where('status', '==', 'open')),
      (snapshot) => setOpenMessages(snapshot.size),
      (err) => console.error('Error counting support messages:', err)
    );

    return () => {
      unsubReservations();
      unsubMessages();
    };
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Erro ao atualizar o pedido.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'preparing': return 'Preparando';
      case 'transit': return 'A Caminho';
      case 'delivered': return 'Entregue';
      default: return 'Novo';
    }
  };

  const todayRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((acc, curr) => acc + (curr.total || 0), 0);

  const activeOrdersCount = orders.filter(o => o.status === 'preparing' || o.status === 'transit').length;

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-color)]"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Painel do Restaurante</h1>
          <p className="admin-subtitle">Gerencie seus pedidos em tempo real.</p>
        </div>
        <div className="admin-header-actions">
          <div className="admin-tabs">
            <button 
              className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ClipboardList className="w-4 h-4" /> Pedidos
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
            >
              <CalendarCheck className="w-4 h-4" /> Reservas
              {pendingReservations > 0 && (
                <span className="admin-tab-badge">{pendingReservations}</span>
              )}
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <MessageSquare className="w-4 h-4" /> Suporte
              {openMessages > 0 && (
                <span className="admin-tab-badge">{openMessages}</span>
              )}
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star className="w-4 h-4" /> Avaliações
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              <LayoutGrid className="w-4 h-4" /> Cardápio
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4" /> Configurações
            </button>
          </div>
          <button className="admin-exit-btn" onClick={() => onNavigate('Home')}>
            Sair do Painel
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        <SettingsAdminTab />
      ) : activeTab === 'menu' ? (
        <MenuAdminTab />
      ) : activeTab === 'reservations' ? (
        <ReservationsAdminTab />
      ) : activeTab === 'support' ? (
        <SupportAdminTab />
      ) : activeTab === 'reviews' ? (
        <ReviewsAdminTab />
      ) : (
        <>
          <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-green-100 text-green-600">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Faturamento Hoje</p>
            <h3 className="stat-value">R$ {todayRevenue.toFixed(2)}</h3>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-blue-100 text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total de Pedidos</p>
            <h3 className="stat-value">{orders.length}</h3>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon-wrapper bg-orange-100 text-[var(--brand-color)]">
            <ChefHat className="w-6 h-6" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pedidos Ativos</p>
            <h3 className="stat-value">{activeOrdersCount}</h3>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <h2 className="admin-section-title">Pedidos Recentes</h2>
        
        <div className="admin-orders-list">
          {orders.length === 0 ? (
            <div className="admin-empty">Nenhum pedido recebido ainda.</div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="admin-order-card">
                <div className="admin-order-header">
                  <div className="order-id-block">
                    <span className="order-id">ORD-{order.id.slice(0, 6).toUpperCase()}</span>
                    <span className="order-time">
                      {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Agora'}
                    </span>
                  </div>
                  <div className={`order-status-badge ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                <div className="admin-order-items">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="admin-order-item">
                      <span className="item-qty">{item.qty}x</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery details — the kitchen needs these to actually deliver */}
                {order.address ? (
                  <div className="admin-order-delivery">
                    <div className="admin-delivery-head">
                      <span className="admin-delivery-title">
                        <MapPin className="w-4 h-4" /> Entrega
                      </span>
                      <button className="admin-copy-btn" onClick={() => copyAddress(order)}>
                        {copiedId === order.id
                          ? <Check className="w-3.5 h-3.5" />
                          : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === order.id ? 'Copiado' : 'Copiar endereço'}
                      </button>
                    </div>

                    {order.customer?.name && (
                      <p className="admin-delivery-line admin-delivery-line--strong">
                        {order.customer.name}
                      </p>
                    )}

                    <p className="admin-delivery-line">{formatAddress(order.address)}</p>

                    {order.customer?.phone && (
                      <p className="admin-delivery-line admin-delivery-phone">
                        <Phone className="w-3.5 h-3.5" />
                        <a href={`tel:${digitsOnly(order.customer.phone)}`}>{order.customer.phone}</a>
                        <a
                          className="admin-whatsapp-link"
                          href={`https://wa.me/55${digitsOnly(order.customer.phone)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </a>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="admin-order-delivery admin-order-delivery--missing">
                    <MapPin className="w-4 h-4" />
                    Pedido antigo sem endereço de entrega
                  </div>
                )}

                <div className="admin-order-footer">
                  <div className="admin-order-total">
                    <span>Total:</span>
                    <strong>R$ {(order.total || 0).toFixed(2)}</strong>
                  </div>
                  
                  <div className="admin-order-actions">
                    {order.status === 'preparing' && (
                      <button 
                        className="admin-btn btn-dispatch"
                        onClick={() => updateOrderStatus(order.id, 'transit')}
                      >
                        <Truck className="w-4 h-4" />
                        Despachar (A Caminho)
                      </button>
                    )}
                    {order.status === 'transit' && (
                      <button 
                        className="admin-btn btn-deliver"
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Marcar como Entregue
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Concluído
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
