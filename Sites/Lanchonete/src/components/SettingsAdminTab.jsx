import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, Palette, Type, CheckCircle } from 'lucide-react';
import './SettingsAdminTab.css';

export default function SettingsAdminTab() {
  const [settings, setSettings] = useState({
    name: 'TasteHouse',
    primaryColor: '#FF6B2B',
    slogan: 'O melhor delivery da região',
    whatsapp: '5511999999999',
    pixKey: '',
    city: 'Sao Paulo',
    deliveryFee: 5.00
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'restaurant'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'settings', 'restaurant'), settings, { merge: true });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando configurações...</div>;

  return (
    <div className="settings-admin-tab">
      <div className="settings-header">
        <h2 className="admin-section-title">Configurações (White-Label)</h2>
        <p className="settings-subtitle">Personalize a aparência do seu sistema de delivery.</p>
      </div>

      <form onSubmit={handleSave} className="settings-form">
        <div className="settings-card">
          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Nome do Restaurante
            </label>
            <input 
              type="text"
              value={settings.name || ''}
              onChange={(e) => setSettings({...settings, name: e.target.value})}
              placeholder="Ex: Sushi do João"
              required
            />
          </div>

          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Slogan / Frase de Efeito
            </label>
            <input 
              type="text"
              value={settings.slogan || ''}
              onChange={(e) => setSettings({...settings, slogan: e.target.value})}
              placeholder="Ex: O melhor sushi da cidade!"
            />
            <p className="settings-help">Aparecerá na página inicial, abaixo do nome.</p>
          </div>

          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Número do WhatsApp (com DDD)
            </label>
            <input 
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
              placeholder="Ex: 5511999999999"
            />
            <p className="settings-help">Usado para receber mensagens de suporte dos clientes.</p>
          </div>

          <div className="settings-group">
            <label>
              <Palette className="w-4 h-4" /> Cor Principal da Marca
            </label>
            <div className="color-picker-wrap">
              <input 
                type="color"
                value={settings.primaryColor || '#FF6B2B'}
                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                required
              />
              <input 
                type="text"
                value={settings.primaryColor || '#FF6B2B'}
                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                placeholder="#FF6B2B"
              />
            </div>
            <p className="settings-help">Todos os botões e ícones do site mudarão instantaneamente para esta cor.</p>
          </div>
          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Chave PIX
            </label>
            <input 
              type="text"
              value={settings.pixKey || ''}
              onChange={(e) => setSettings({...settings, pixKey: e.target.value})}
              placeholder="Ex: email@exemplo.com, +5511999999999, 123.456.789-09"
            />
            <p className="settings-help">Chave usada para gerar o QR Code PIX nos pedidos. Pode ser e-mail, telefone, CPF/CNPJ ou chave aleatória.</p>
          </div>

          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Cidade (para o PIX)
            </label>
            <input 
              type="text"
              value={settings.city || ''}
              onChange={(e) => setSettings({...settings, city: e.target.value})}
              placeholder="Ex: Sao Paulo"
            />
            <p className="settings-help">Nome da cidade que aparece no QR Code PIX (máx. 15 caracteres, sem acentos).</p>
          </div>

          <div className="settings-group">
            <label>
              <Type className="w-4 h-4" /> Taxa de Entrega Fixa (R$)
            </label>
            <input 
              type="number"
              step="0.01"
              value={settings.deliveryFee || 0}
              onChange={(e) => setSettings({...settings, deliveryFee: parseFloat(e.target.value)})}
            />
            <p className="settings-help">Valor adicionado no carrinho.</p>
          </div>
        </div>

        <button type="submit" className={`btn-save-settings ${success ? 'btn-success' : ''}`} disabled={saving || success}>
          {success ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Configurações Salvas!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
