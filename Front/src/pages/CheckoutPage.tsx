import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Toast } from '../components/Toast';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
    if (!formData.city.trim()) newErrors.city = 'Cidade é obrigatória';
    if (!formData.state.trim()) newErrors.state = 'Estado é obrigatório';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Número do cartão é obrigatório';
    if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Data de validade é obrigatória';
    if (!formData.cardCVV.trim()) newErrors.cardCVV = 'CVV é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Criar pedido baseado no carrinho
      const order = await orderService.create({
        items: [], // Os itens vêm do carrinho
      });

      setToast({ message: 'Pedido realizado com sucesso!', type: 'success' });
      setTimeout(() => navigate(`/order/${order.id}`), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao processar pedido';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <Card title="Informações Pessoais">
            <Input
              id="fullName"
              type="text"
              name="fullName"
              label="Nome Completo"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={errors.fullName}
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
          </Card>

          <Card title="Endereço de Entrega">
            <Input
              id="address"
              type="text"
              name="address"
              label="Endereço"
              value={formData.address}
              onChange={handleChange}
              required
              error={errors.address}
            />

            <div className="form-row">
              <Input
                id="city"
                type="text"
                name="city"
                label="Cidade"
                value={formData.city}
                onChange={handleChange}
                required
                error={errors.city}
              />

              <Input
                id="state"
                type="text"
                name="state"
                label="Estado"
                value={formData.state}
                onChange={handleChange}
                required
                error={errors.state}
              />

              <Input
                id="zipCode"
                type="text"
                name="zipCode"
                label="CEP"
                value={formData.zipCode}
                onChange={handleChange}
                required
                error={errors.zipCode}
              />
            </div>
          </Card>

          <Card title="Pagamento">
            <Input
              id="cardNumber"
              type="text"
              name="cardNumber"
              label="Número do Cartão"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
              error={errors.cardNumber}
            />

            <div className="form-row">
              <Input
                id="cardExpiry"
                type="text"
                name="cardExpiry"
                label="Validade (MM/YY)"
                value={formData.cardExpiry}
                onChange={handleChange}
                placeholder="12/25"
                required
                error={errors.cardExpiry}
              />

              <Input
                id="cardCVV"
                type="text"
                name="cardCVV"
                label="CVV"
                value={formData.cardCVV}
                onChange={handleChange}
                placeholder="123"
                required
                error={errors.cardCVV}
              />
            </div>
          </Card>

          <div className="checkout-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/cart')}
            >
              Voltar ao Carrinho
            </Button>

            <Button type="submit" variant="primary" isLoading={isLoading}>
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </div>

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
