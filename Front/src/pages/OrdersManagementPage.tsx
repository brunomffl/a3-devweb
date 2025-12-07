import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import type { Order } from '../types';
import { Card } from '../components/Card';

export const OrdersManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await orderService.getAll(1, 100);
      setOrders(response.data);
    } catch (err) {
      console.error('Erro ao carregar pedidos', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateStatus(orderId, { status: newStatus });
      loadOrders();
    } catch (err) {
      console.error('Erro ao atualizar status', err);
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

  return (
    <div className="management-page">
      <h1>Gerenciar Pedidos</h1>

      <div className="orders-management-list">
        {orders.map((order) => (
          <Card key={order.id} className="order-management-item">
            <div className="item-content">
              <div className="item-info">
                <h3>Pedido #{order.id}</h3>
                <p>Usuário: {order.user?.name}</p>
                <p>Email: {order.user?.email}</p>
                <div className="item-meta">
                  <span>Itens: {order.items.length}</span>
                  <span>Total: R$ {order.totalPrice.toFixed(2)}</span>
                  <span>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="item-status">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="item-actions">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className="status-select"
                >
                  <option value="pending">Pendente</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>

            <div className="order-items-preview">
              <h4>Itens:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product?.name} - Qtd: {item.quantity} - R$ {item.subtotal.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
