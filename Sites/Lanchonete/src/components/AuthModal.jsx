import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import './AuthModal.css';

// Firebase error codes -> mensagens em português.
const AUTH_ERRORS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/missing-password': 'Informe sua senha.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/popup-closed-by-user': 'Login cancelado.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
};

const getAuthErrorMessage = (error) =>
  AUTH_ERRORS[error?.code] || 'Não foi possível concluir a operação. Tente novamente.';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const credential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (formData.name.trim()) {
          await updateProfile(credential.user, { displayName: formData.name.trim() });
        }
      }

      setFormData({ name: '', email: '', password: '' });
      onClose();
    } catch (err) {
      console.error("Auth error:", err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      console.error("Google Login Error:", err);
      setError(getAuthErrorMessage(err));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>

        <div className="auth-header">
          <div className="auth-icon-wrap">
            <Lock className="h-6 w-6 text-[var(--brand-color)]" />
          </div>
          <h2 className="auth-title">{isLogin ? 'Bem-vindo de volta' : 'Criar uma conta'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Entre com seus dados para acessar sua conta' : 'Cadastre-se para começar a pedir'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-input-group">
              <UserIcon className="auth-input-icon" />
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}

          <div className="auth-input-group">
            <Mail className="auth-input-icon" />
            <input
              type="email"
              placeholder="Endereço de e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="auth-input-group">
            <Lock className="auth-input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {isLogin && (
            <div className="auth-forgot">
              <a href="#" onClick={(e) => e.preventDefault()}>Esqueceu sua senha?</a>
            </div>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Aguarde...
              </>
            ) : (
              <>
                {isLogin ? 'Entrar' : 'Criar Conta'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou continue com</span>
        </div>

        <div className="auth-social">
          <button className="auth-social-btn" onClick={handleGoogleLogin} type="button">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </button>
          <button className="auth-social-btn" type="button" disabled title="Login com GitHub em breve">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <div className="auth-toggle">
          {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
          <button onClick={switchMode}>
            {isLogin ? 'Cadastre-se' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
