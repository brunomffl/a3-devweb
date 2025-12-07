import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { orderService } from '../services/orderService';
import type { Order } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data = await orderService.getById(id);
        setOrder(data);
      }
    } catch (err) {
      setToast({ message: 'Erro ao carregar pedido', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={24} />;
      case 'processing':
        return <Package size={24} />;
      case 'shipped':
        return <Truck size={24} />;
      case 'delivered':
        return <CheckCircle size={24} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      pending: 'Pendente',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado',
    };
    return labels[status];
  };

  if (isLoading) {
    return <div className="loading">Carregando pedido...</div>;
  }

  if (!order) {
    return <div className="error">Pedido não encontrado</div>;
  }

  return (
    <div className="order-detail-page">
      <Button onClick={() => navigate('/my-orders')} variant="secondary">
        ← Meus Pedidos
      </Button>

      <div className="order-header">
        <Card className="order-status-card">
          <div className="status-icon">{getStatusIcon(order.status)}</div>
          <h1>Pedido #{order.id}</h1>
          <p className="status-label">{getStatusLabel(order.status)}</p>
        </Card>
      </div>

      <div className="order-content">
        <Card title="Itens do Pedido">
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <h4>{item.product?.name}</h4>
                  <p>{item.product?.description}</p>
                </div>
                <div className="item-qty">Qtd: {item.quantity}</div>
                <div className="item-price">R$ {item.subtotal.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Resumo do Pedido">
          <div className="order-summary">
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>R$ {order.items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Frete:</span>
              <span>Grátis</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>R$ {order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="order-date">
              <small>Pedido realizado em: {new Date(order.createdAt).toLocaleDateString('pt-BR')}</small>
            </div>
          </div>
        </Card>

        <div className="order-actions">
          <Button variant="primary" onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <Button variant="danger">
              Cancelar Pedido
            </Button>
          )}
        </div>
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
