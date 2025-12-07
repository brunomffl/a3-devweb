import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isLoading, error, setError } = useLoading();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData.email, formData.password);
      setToast({ message: 'Login realizado com sucesso!', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="page-container">
      <Card className="auth-card" title="Login">
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            error={error && formData.email === '' ? 'Email é obrigatório' : undefined}
          />

          <Input
            id="password"
            type="password"
            name="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            error={error && formData.password === '' ? 'Senha é obrigatória' : undefined}
          />

          {error && <div className="form-error">{error}</div>}

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
            Entrar
          </Button>

          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
            Não tem conta?{' '}
            <a href="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Registre-se
            </a>
          </p>
        </form>
      </Card>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
