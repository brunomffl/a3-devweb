import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLoading } from '../hooks/useLoading';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { isLoading, error, setError } = useLoading();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro do campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      await register(formData.name, formData.email, formData.password);
      setToast({ message: 'Cadastro realizado com sucesso!', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao registrar';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="page-container">
      <Card className="auth-card" title="Registrar">
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            type="text"
            name="name"
            label="Nome Completo"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
          />

          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <Input
            id="password"
            type="password"
            name="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirmar Senha"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />

          {error && <div className="form-error">{error}</div>}

          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
            Registrar
          </Button>

          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#6b7280' }}>
            Já tem conta?{' '}
            <a href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Faça login
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
