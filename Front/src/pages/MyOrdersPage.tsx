import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { orderService } from '../services/orderService';
import type { Order } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderService.getMyOrders();
      setOrders(response.data);
    } catch (err) {
      console.error('Erro ao carregar pedidos', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors: Record<Order['status'], string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status];
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
    return <div className="loading">Carregando pedidos...</div>;
  }

  if (orders.length === 0) {
    return (
      <Card className="empty-orders">
        <h2>Você ainda não fez nenhum pedido</h2>
        <Link to="/">
          <Button variant="primary">Começar a Comprar</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="my-orders-page">
      <h1>Meus Pedidos</h1>

      <div className="orders-table">
        {orders.map((order) => (
          <Card key={order.id} className="order-row">
            <div className="order-row-content">
              <div className="order-info">
                <h3>Pedido #{order.id}</h3>
                <p>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>

              <div className="order-items-count">
                <span>{order.items.length} item(ns)</span>
              </div>

              <div className="order-price">
                <strong>R$ {order.totalPrice.toFixed(2)}</strong>
              </div>

              <div className="order-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <Link to={`/order/${order.id}`}>
                <Button variant="primary" size="sm">
                  <Eye size={16} /> Ver Detalhes
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
