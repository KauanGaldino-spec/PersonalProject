import React, { useState, useEffect } from 'react';
import {
  Package, Clock, CheckCircle, ChevronRight, ChevronDown, RefreshCw, MapPin, Loader2,
  XCircle, Receipt, LogIn, Phone
} from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import TrackingModal from './TrackingModal';
import { formatAddress } from '../utils/address';
import './OrdersPage.css';

const ACTIVE_STATUSES = ['pending', 'preparing', 'transit'];

const StatusBadge = ({ status }) => {
  if (status === 'cancelled') {
    return (
      <div className="order-status badge-cancelled">
        <XCircle className="w-4 h-4" />
        Cancelado
      </div>
    );
  }
  if (status === 'transit') {
    return (
      <div className="order-status badge-transit">
        <MapPin className="w-4 h-4" />
        A caminho
      </div>
    );
  }
  if (status === 'delivered') {
    return (
      <div className="order-status badge-delivered">
        <CheckCircle className="w-4 h-4" />
        Entregue
      </div>
    );
  }
  return (
    <div className="order-status badge-preparing">
      <Clock className="w-4 h-4" />
      Preparando
    </div>
  );
};

// Rebuilds the subtotal / delivery fee / discount breakdown for the details view
// (orders store the final total plus the applied promo, not the breakdown).
const getOrderBreakdown = (order) => {
  const items = order.items || [];
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    return sum + price * (item.qty || 0);
  }, 0);

  const discountInfo = order.discount || {};
  let discountValue = 0;
  if (discountInfo.type === 'percent') discountValue = subtotal * discountInfo.amount;
  else if (discountInfo.type === 'fixed') discountValue = discountInfo.amount;
  discountValue = Math.min(discountValue, subtotal);

  const deliveryFee = Math.max(0, (order.total || 0) - (subtotal - discountValue));

  return { items, subtotal, discountInfo, discountValue, deliveryFee };
};

export default function OrdersPage({ onNavigate, user, onReorder, onOpenAuth }) {
  const [filter, setFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, 'orders'), where('userId', '==', user.uid));

    // onSnapshot (instead of a one-off getDocs) keeps the list AND the tracking
    // modal in sync the moment the admin panel changes an order status.
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

        // Sort client-side to avoid needing a composite index in Firestore
        fetchedOrders.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setOrders(fetchedOrders);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Resolve the tracked order from the live list so the modal never shows stale data.
  const trackingOrder = orders.find((order) => order.id === trackingOrderId) || null;

  const filteredOrders = orders.filter(order => {
    if (filter === 'active') return ACTIVE_STATUSES.includes(order.status);
    if (filter === 'past') return !ACTIVE_STATUSES.includes(order.status);
    return true;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Agora mesmo';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('pt-BR', { 
      month: 'short', day: 'numeric', year: 'numeric', 
      hour: 'numeric', minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="orders-page flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-color)]" />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div className="orders-title-wrap">
          <div className="orders-icon-bg">
            <Package className="w-6 h-6 text-[var(--brand-color)]" />
          </div>
          <div>
            <h2 className="orders-title">Meus Pedidos</h2>
            <p className="orders-subtitle">Acompanhe e repita seus pedidos favoritos.</p>
          </div>
        </div>

        <div className="orders-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Ativos
          </button>
          <button 
            className={`filter-btn ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Anteriores
          </button>
        </div>
      </div>

      {!user ? (
        <div className="orders-empty">
          <LogIn className="empty-icon" />
          <h3>Faça login para ver seus pedidos</h3>
          <p>Entre na sua conta para acompanhar seus pedidos em tempo real.</p>
          <button className="empty-btn" onClick={() => onOpenAuth?.()}>
            Fazer Login
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="orders-empty">
          <Package className="empty-icon" />
          <h3>Nenhum pedido encontrado</h3>
          <p>Parece que você ainda não fez nenhum pedido nesta categoria.</p>
          <button className="empty-btn" onClick={() => onNavigate('Menu')}>
            Começar a Explorar
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => {
            const isExpanded = expandedId === order.id;
            const isActive = ACTIVE_STATUSES.includes(order.status);
            const { items, subtotal, discountInfo, discountValue, deliveryFee } = getOrderBreakdown(order);

            return (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-id">ORD-{String(order.id).slice(0, 6).toUpperCase()}</span>
                    <span className="order-date">{formatDate(order.createdAt)}</span>
                  </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="order-card-body">
                <div className="order-restaurant">
                  <MapPin className="w-4 h-4 text-[#9E9E9E]" />
                  <span>{order.restaurant}</span>
                </div>
                
                <ul className="order-items">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      <span className="item-qty">{item.qty}x</span>
                      <span className="item-name">{item.name}</span>
                    </li>
                  ))}
                </ul>

                {!isExpanded && (
                  <div className="order-total">
                    <span>Valor Total:</span>
                    <strong>R$ {(order.total || 0).toFixed(2)}</strong>
                  </div>
                )}

                {isExpanded && (
                  <div className="order-details">
                    <ul className="order-details-list">
                      {items.map((item, idx) => {
                        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                        return (
                          <li key={idx}>
                            <span className="item-qty">{item.qty}x</span>
                            <span className="item-name">{item.name}</span>
                            <span className="item-line-price">R$ {(price * item.qty).toFixed(2)}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="details-row">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="details-row">
                        <span>Taxa de entrega</span>
                        <span>R$ {deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    {discountValue > 0 && (
                      <div className="details-row details-row--discount">
                        <span>Desconto{discountInfo.code ? ` (${discountInfo.code})` : ''}</span>
                        <span>-R$ {discountValue.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="details-row details-row--total">
                      <span>Total</span>
                      <strong>R$ {(order.total || 0).toFixed(2)}</strong>
                    </div>

                    {order.address && (
                      <div className="order-details-delivery">
                        <p className="order-details-delivery-title">
                          <MapPin className="w-4 h-4" /> Entrega
                        </p>
                        {order.customer?.name && (
                          <p className="order-details-delivery-line order-details-delivery-line--strong">
                            {order.customer.name}
                          </p>
                        )}
                        <p className="order-details-delivery-line">
                          {formatAddress(order.address)}
                        </p>
                        {order.customer?.phone && (
                          <p className="order-details-delivery-line">
                            <Phone className="w-3.5 h-3.5" /> {order.customer.phone}
                          </p>
                        )}
                      </div>
                    )}

                    <p className="order-details-foot">Pedido realizado em {formatDate(order.createdAt)}</p>
                  </div>
                )}
              </div>

              <div className="order-card-footer">
                {isActive ? (
                  <button className="btn-track" onClick={() => setTrackingOrderId(order.id)}>
                    Acompanhar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button className="btn-reorder" onClick={() => onReorder?.(order)}>
                    <RefreshCw className="w-4 h-4" />
                    Pedir Novamente
                  </button>
                )}
                <button
                  className="btn-details"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <Receipt className="w-4 h-4" />
                  {isExpanded ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Tracking Modal */}
      {trackingOrder && (
        <TrackingModal 
          order={trackingOrder} 
          onClose={() => setTrackingOrderId(null)} 
        />
      )}
    </div>
  );
}
