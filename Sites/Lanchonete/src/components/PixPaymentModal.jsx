import React, { useState, useMemo, useRef, useEffect } from 'react';
import { QrCode, Check, Copy, X, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { summarizeAddress } from '../utils/address';
import { buildPixPayload, generateTxId } from '../utils/pix';
import './PixPaymentModal.css';

export default function PixPaymentModal({
  isOpen, onClose, total, onConfirm, address,
  pixKey, restaurantName, restaurantCity
}) {
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Generate a fresh txid each time the modal opens
  const [txid, setTxid] = useState(() => generateTxId());
  const prevIsOpen = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) setTxid(generateTxId());
    prevIsOpen.current = isOpen;
  }, [isOpen]);
  const deliverySummary = summarizeAddress(address);

  // Build the real PIX payload from the dynamic settings
  const payload = useMemo(() => {
    if (!pixKey) return null;
    return buildPixPayload({
      key: pixKey,
      name: restaurantName || 'RECEBEDOR',
      city: restaurantCity || 'CIDADE',
      amount: total,
      txid,
    });
  }, [pixKey, restaurantName, restaurantCity, total, txid]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setProcessing(true);
    // Simulate network delay for PIX confirmation
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="pix-overlay" onClick={onClose}>
      <div className="pix-modal" onClick={e => e.stopPropagation()}>
        <button className="pix-close-btn" onClick={onClose} disabled={processing}>
          <X className="w-5 h-5" />
        </button>

        <div className="pix-header">
          <div className="pix-logo-bg">
            <QrCode className="w-6 h-6 text-[#32BCAD]" />
          </div>
          <h2>Pagamento via PIX</h2>
          <p>Escaneie o QR Code ou copie a chave PIX para finalizar seu pedido de <strong>R$ {total.toFixed(2)}</strong>.</p>
        </div>

        {deliverySummary && (
          <div className="pix-delivery">
            <MapPin className="w-4 h-4" />
            <span>Entregar em <strong>{deliverySummary}</strong></span>
          </div>
        )}

        {!pixKey ? (
          /* No PIX key configured — show a warning instead of a QR */
          <div className="pix-no-key">
            <AlertCircle className="w-6 h-6" />
            <p>Chave PIX não configurada. Peça ao administrador para definir uma chave em <strong>Painel Admin → Configurações</strong>.</p>
          </div>
        ) : !payload ? (
          /* Payload generation failed */
          <div className="pix-no-key">
            <AlertCircle className="w-6 h-6" />
            <p>Não foi possível gerar o QR Code. Verifique a chave PIX nas configurações.</p>
          </div>
        ) : (
          <>
            <div className="pix-qr-container">
              <div className="pix-qr-real">
                <QRCodeCanvas
                  value={payload}
                  size={200}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#1A1A1A"
                />
              </div>
            </div>

            <div className="pix-key-section">
              <span className="pix-key-label">PIX Copia e Cola</span>
              <div className="pix-key-box">
                <span className="pix-key-value">{payload.slice(0, 30)}...</span>
                <button className="pix-copy-btn" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        <div className="pix-footer">
          <button
            className="pix-confirm-btn"
            onClick={handleConfirm}
            disabled={processing || !payload}
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirmando Pagamento...
              </>
            ) : (
              'Já realizei o pagamento'
            )}
          </button>
          <p className="pix-disclaimer">Seu pedido será processado imediatamente após a confirmação do pagamento.</p>
        </div>
      </div>
    </div>
  );
}
