import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { cartService } from '../services/cartService';
import type { Cart } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setIsLoading(true);
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      setToast({ message: 'Erro ao carregar carrinho', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await handleRemoveItem(productId);
      } else {
        const updatedCart = await cartService.updateItem(productId, quantity);
        setCart(updatedCart);
      }
    } catch (err) {
      setToast({ message: 'Erro ao atualizar quantidade', type: 'error' });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const updatedCart = await cartService.removeItem(productId);
      setCart(updatedCart);
      setToast({ message: 'Produto removido do carrinho', type: 'success' });
    } catch (err) {
      setToast({ message: 'Erro ao remover produto', type: 'error' });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isLoading) {
    return <div className="loading">Carregando carrinho...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <Card className="empty-cart-content">
          <ShoppingBag size={48} />
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para começar suas compras</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Continuar Comprando
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Meu Carrinho</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <Card key={item.productId} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-info">
                  <h3>{item.product?.name}</h3>
                  <p className="cart-item-description">{item.product?.description}</p>
                  <div className="cart-item-price">R$ {item.product?.price.toFixed(2)}</div>
                </div>

                <div className="cart-item-quantity">
                  <label>Quantidade:</label>
                  <div className="quantity-input-group">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.productId, parseInt(e.target.value))
                      }
                      className="quantity-input"
                    />
                    <span className="subtotal">
                      Subtotal: R$ {(item.quantity * (item.product?.price || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(item.productId)}
                  className="remove-btn"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="cart-summary" title="Resumo do Carrinho">
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>R$ {(cart.totalPrice).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Frete:</span>
            <span>Grátis</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>R$ {(cart.totalPrice).toFixed(2)}</span>
          </div>

          <Button variant="primary" onClick={handleCheckout} className="checkout-btn">
            Ir para Checkout
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/')}
            className="continue-shopping-btn"
          >
            Continuar Comprando
          </Button>
        </Card>
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
