import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import type { Product } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data = await productService.getById(id);
        setProduct(data);
      }
    } catch (err) {
      setToast({ message: 'Erro ao carregar produto', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await cartService.addItem({
        productId: product.id,
        quantity,
      });
      setToast({ message: 'Produto adicionado ao carrinho!', type: 'success' });
      setTimeout(() => navigate('/cart'), 1500);
    } catch (err) {
      setToast({ message: 'Erro ao adicionar ao carrinho', type: 'error' });
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!product) {
    return <div className="error">Produto não encontrado</div>;
  }

  return (
    <div className="product-detail-page">
      <Button onClick={() => navigate(-1)} variant="secondary">
        ← Voltar
      </Button>

      <div className="product-detail-container">
        <Card className="product-image-section">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-image-large" />
          ) : (
            <div className="image-placeholder-large">Sem imagem</div>
          )}
        </Card>

        <Card className="product-info-section" title={product.name}>
          <div className="product-description-large">{product.description}</div>

          <div className="product-price-large">R$ {product.price.toFixed(2)}</div>

          <div className="product-stock-info">
            {product.stock > 0 ? (
              <span className="in-stock">Em estoque ({product.stock} unidades)</span>
            ) : (
              <span className="out-of-stock">Fora de estoque</span>
            )}
          </div>

          <div className="product-category">
            <strong>Categoria:</strong> {product.category}
          </div>

          {product.stock > 0 && (
            <div className="quantity-selector">
              <label>Quantidade:</label>
              <div className="quantity-controls">
                <Button
                  variant="secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </Button>
                <span className="quantity-display">{quantity}</span>
                <Button
                  variant="secondary"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={18} />
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            <ShoppingCart size={20} />
            Adicionar ao Carrinho
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
