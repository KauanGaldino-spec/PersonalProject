import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import './ReservationsPage.css';

export default function ReservationsPage({ user }) {
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    date: '',
    time: '19:30',
    guests: 2,
    requests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'reservations'), {
        userId: user?.uid || null,
        name: formData.name,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        requests: formData.requests,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Error saving reservation:", err);
      setError('Não foi possível enviar sua reserva. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError('');
    setFormData({ ...formData, date: '', requests: '' });
  };

  return (
    <div className="reservations-page">
      <div className="reservations-container">
        {/* Left side: Info / Image */}
        <div className="reservations-info">
          <h1 className="reservations-title">Reserve uma Mesa</h1>
          <p className="reservations-subtitle">
            Garanta seu lugar e prepare-se para uma experiência gastronômica inesquecível.
          </p>
          
          <div className="reservations-features">
            <div className="feature-item">
              <div className="feature-icon"><Calendar className="w-5 h-5" /></div>
              <div>
                <h4>Aberto de Terça a Domingo</h4>
                <p>18:00 às 23:30</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Users className="w-5 h-5" /></div>
              <div>
                <h4>Ambiente Familiar</h4>
                <p>Mesas para até 12 pessoas</p>
              </div>
            </div>
          </div>
          
          <div className="reservations-image-wrap">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
              alt="Restaurant Ambience" 
            />
          </div>
        </div>

        {/* Right side: Form */}
        <div className="reservations-form-card">
          {isSubmitted ? (
            <div className="reservation-success">
              <div className="success-icon-wrap">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2>Reserva Confirmada!</h2>
              <p>Sua mesa para <strong>{formData.guests} pessoas</strong> no dia <strong>{new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR')}</strong> às <strong>{formData.time}</strong> foi reservada com sucesso.</p>
              <button onClick={resetForm} className="new-reservation-btn">
                Fazer Outra Reserva
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reservation-form">
              <h3>Detalhes da Reserva</h3>
              
              <div className="form-group">
                <label>Nome Completo</label>
                <div className="input-wrap">
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome"
                    maxLength={120}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data</label>
                  <div className="input-wrap">
                    <Calendar className="input-icon" />
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Horário</label>
                  <div className="input-wrap">
                    <Clock className="input-icon" />
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    >
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Número de Pessoas</label>
                <div className="input-wrap">
                  <Users className="input-icon" />
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                    required
                  >
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Pessoa' : 'Pessoas'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Pedidos Especiais (Opcional)</label>
                <div className="input-wrap textarea-wrap">
                  <MessageSquare className="input-icon" />
                  <textarea 
                    value={formData.requests}
                    onChange={(e) => setFormData({...formData, requests: e.target.value})}
                    placeholder="Aniversário, alergias, preferência de mesa..."
                    rows="3"
                    maxLength={1000}
                  />
                </div>
              </div>

              {error && (
                <p className="reservation-error">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}

              <button type="submit" className="submit-reservation-btn" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Confirmar Reserva'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
