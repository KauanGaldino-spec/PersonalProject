import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, X } from 'lucide-react';
import './CartDropdown.css';

export default function CartDropdown({ items = [], onUpdateQty, onRemove, onCheckout, deliveryFee = 0 }) {
  const [open, setOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState({ amount: 0, type: null, code: '', error: '' });
  const ref = useRef(null);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    let newDiscount = { amount: 0, type: null, code: code, error: '' };

    if (code === 'WELCOME20') {
      newDiscount = { amount: 0.2, type: 'percent', code, error: '' };
    } else if (code === 'FLASH30') {
      newDiscount = { amount: 0.3, type: 'percent', code, error: '' };
    } else if (code === 'COMBO15') {
      newDiscount = { amount: 0.15, type: 'percent', code, error: '' };
    } else if (code === 'WEEKEND5') {
      newDiscount = { amount: 5, type: 'fixed', code, error: '' };
    } else if (code === 'REFER8') {
      newDiscount = { amount: 8, type: 'fixed', code, error: '' };
    } else if (code === 'FREEDELIVERY') {
      newDiscount = { amount: 5, type: 'fixed', code, error: '' }; // Mock delivery fee
    } else {
      newDiscount = { amount: 0, type: null, code: '', error: 'Cupom inválido ou expirado.' };
    }

    setDiscountInfo(newDiscount);
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountInfo({ amount: 0, type: null, code: '', error: '' });
  };

  let discountValue = 0;
  if (discountInfo.type === 'percent') {
    discountValue = subtotal * discountInfo.amount;
  } else if (discountInfo.type === 'fixed') {
    discountValue = discountInfo.amount;
  }

  // Ensure discount doesn't exceed subtotal
  discountValue = Math.min(discountValue, subtotal);
  const totalPrice = subtotal - discountValue + deliveryFee;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCheckoutClick = async () => {
    if (!onCheckout) return;
    setIsCheckingOut(true);
    const success = await onCheckout(discountInfo, totalPrice);
    setIsCheckingOut(false);
    if (success) {
      setOpen(false); // Close the dropdown if successful
    }
  };

  return (
    <div className="cart-dropdown" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-[#1A1A1A] transition hover:bg-[#F7F7F7]"
      >
        <span className="cart-icon-wrap">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </span>
        <span className="hidden sm:inline">Carrinho</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="cart-panel">
          <div className="cart-panel-header">
            <h3>Seu Carrinho ({totalItems})</h3>
            <button onClick={() => setOpen(false)} className="cart-close-btn">
              <X className="h-4 w-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag className="cart-empty-icon" />
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-sub">{item.subtitle}</p>
                      <div className="cart-item-row">
                        <span className="cart-item-price">R$ {(item.price * item.qty).toFixed(2)}</span>
                        <div className="cart-qty-controls">
                          <button onClick={() => onUpdateQty?.(item.id, -1)} className="cart-qty-btn">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="cart-qty-value">{item.qty}</span>
                          <button onClick={() => onUpdateQty?.(item.id, 1)} className="cart-qty-btn">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => onRemove?.(item.id)} className="cart-remove-btn">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-promo-section">
                  {discountInfo.code && !discountInfo.error ? (
                    <div className="cart-promo-active">
                      <span className="cart-promo-code-applied">Cupom {discountInfo.code} aplicado!</span>
                      <button onClick={removePromo} className="cart-promo-remove"><X className="h-3 w-3"/></button>
                    </div>
                  ) : (
                    <div className="cart-promo-input-group">
                      <input 
                        type="text" 
                        placeholder="Digite o cupom" 
                        className="cart-promo-input"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                      />
                      <button className="cart-promo-btn" onClick={handleApplyPromo}>Aplicar</button>
                    </div>
                  )}
                  {discountInfo.error && <p className="cart-promo-error">{discountInfo.error}</p>}
                </div>

                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span className="cart-subtotal-price">R$ {subtotal.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="cart-total-row">
                    <span>Taxa de Entrega</span>
                    <span className="cart-subtotal-price">R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {discountValue > 0 && (
                  <div className="cart-discount-row">
                    <span>Desconto</span>
                    <span className="cart-discount-price">-R$ {discountValue.toFixed(2)}</span>
                  </div>
                )}
                <div className="cart-final-total-row">
                  <span>Total</span>
                  <span className="cart-total-price">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button className="cart-checkout-btn" onClick={handleCheckoutClick} disabled={isCheckingOut}>
                  {isCheckingOut ? 'Processando...' : 'Finalizar Pedido'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
