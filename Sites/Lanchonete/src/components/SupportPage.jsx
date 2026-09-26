import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, Send, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './SupportPage.css';

const FAQS = [
  { q: 'Como acompanho meu pedido?', a: 'Acesse a seção Pedidos no menu lateral. Você verá o acompanhamento em tempo real de todos os pedidos ativos, incluindo a previsão de entrega e a localização do entregador.' },
  { q: 'Qual é o prazo de entrega?', a: 'O prazo médio é de 25 a 40 minutos, dependendo da sua localização e da distância do restaurante. A entrega expressa está disponível para restaurantes selecionados.' },
  { q: 'Posso cancelar meu pedido?', a: 'Você pode cancelar até 2 minutos após fazer o pedido e receber o reembolso integral. Depois disso, podem ser aplicadas taxas de cancelamento conforme o status do preparo.' },
  { q: 'Como aplico um cupom de desconto?', a: 'Informe o código do cupom no campo "Digite o cupom" do carrinho. O desconto será aplicado imediatamente ao total do pedido.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Aceitamos PIX, cartões de crédito e débito, Apple Pay, Google Pay e dinheiro na entrega em algumas regiões.' },
  { q: 'Como solicito um reembolso?', a: 'Acesse o histórico de pedidos, selecione o pedido e toque em "Solicitar Reembolso". Nossa equipe analisa todas as solicitações em até 24 horas.' },
];

const CONTACTS = [
  { icon: Phone, label: 'WhatsApp', value: 'Clique para conversar', sub: 'Seg-Sex, 9h-21h', color: '#27AE60', isWhatsApp: true },
  { icon: Mail, label: 'Email', value: 'contato@exemplo.com', sub: 'Respondemos em até 24h', color: '#3498DB' },
  { icon: MessageCircle, label: 'Chat ao Vivo', value: 'Iniciar conversa', sub: 'Disponível 24/7', color: 'var(--brand-color)' },
  { icon: MapPin, label: 'Endereço', value: 'Rua Principal, 123', sub: 'Aberto Seg-Sáb 10h-18h', color: '#8E44AD' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown className="faq-chevron" />
      </button>
      <div className="faq-answer-wrap">
        <p className="faq-answer">{a}</p>
      </div>
    </div>
  );
}

export default function SupportPage({ restaurantSettings, user }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await addDoc(collection(db, 'supportMessages'), {
        userId: user?.uid || null,
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        status: 'open',
        createdAt: serverTimestamp(),
      });

      setFeedback({ type: 'success', message: 'Mensagem enviada! Responderemos em breve.' });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error("Error sending support message:", err);
      setFeedback({ type: 'error', message: 'Não foi possível enviar sua mensagem. Tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="support-page">
      <div className="support-header">
        <h2 className="support-title">Central de Ajuda</h2>
        <p className="support-subtitle">Estamos aqui para ajudar. Fale com a gente quando precisar.</p>
      </div>

      {/* Contact cards */}
      <div className="support-contacts">
        {CONTACTS.map((c) => {
          const Icon = c.icon;
          return (
            <div 
              className="support-contact-card" 
              key={c.label}
              style={c.isWhatsApp ? { cursor: 'pointer' } : {}}
              onClick={() => {
                if (c.isWhatsApp && restaurantSettings?.whatsapp) {
                  window.open(`https://wa.me/${restaurantSettings.whatsapp.replace(/\D/g, '')}`, '_blank');
                }
              }}
            >
              <span className="support-contact-icon" style={{ background: `${c.color}15`, color: c.color }}>
                <Icon className="support-icon-svg" />
              </span>
              <div>
                <p className="support-contact-label">{c.label}</p>
                <p className="support-contact-value">{c.isWhatsApp && restaurantSettings?.whatsapp ? restaurantSettings.whatsapp : c.value}</p>
                <p className="support-contact-sub">{c.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="support-main">
        {/* FAQ */}
        <div className="support-faq">
          <h3 className="support-section-title">Perguntas Frequentes</h3>
          <div className="faq-list">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>

        {/* Contact form */}
        <div className="support-form-wrap">
          <h3 className="support-section-title">Envie uma Mensagem</h3>
          <form className="support-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Seu Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="support-input"
              maxLength={120}
              required
            />
            <input
              type="email"
              placeholder="Seu E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="support-input"
              maxLength={160}
              required
            />
            <textarea
              placeholder="Como podemos ajudar?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="support-input support-textarea"
              rows={5}
              maxLength={2000}
              required
            />

            {feedback.message && (
              <p className={`support-feedback support-feedback--${feedback.type}`}>
                {feedback.message}
              </p>
            )}

            <button type="submit" className="support-submit-btn" disabled={submitting}>
              {submitting ? <Loader2 className="support-send-icon animate-spin" /> : <Send className="support-send-icon" />}
              {submitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
