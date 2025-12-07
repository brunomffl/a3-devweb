import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { productService } from '../services/productService';
import type { Product } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { Input } from '../components/Input';

export const ProductsManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAll(1, 100);
      setProducts(response.data);
    } catch (err) {
      setToast({ message: 'Erro ao carregar produtos', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await productService.update(editingId, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
        });
        setToast({ message: 'Produto atualizado com sucesso!', type: 'success' });
      } else {
        await productService.create({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
        });
        setToast({ message: 'Produto criado com sucesso!', type: 'success' });
      }

      setFormData({ name: '', description: '', price: '', stock: '', category: '' });
      setEditingId(null);
      setShowForm(false);
      loadProducts();
    } catch (err: any) {
      setToast({ message: 'Erro ao salvar produto', type: 'error' });
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await productService.delete(id);
        setToast({ message: 'Produto deletado com sucesso!', type: 'success' });
        loadProducts();
      } catch (err) {
        setToast({ message: 'Erro ao deletar produto', type: 'error' });
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', stock: '', category: '' });
  };

  if (isLoading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="management-page">
      <div className="management-header">
        <h1>Gerenciar Produtos</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancelar' : 'Novo Produto'}
        </Button>
      </div>

      {showForm && (
        <Card className="form-card" title={editingId ? 'Editar Produto' : 'Novo Produto'}>
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              type="text"
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              id="description"
              type="text"
              name="description"
              label="Descrição"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <Input
              id="price"
              type="number"
              name="price"
              label="Preço"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              required
            />

            <Input
              id="stock"
              type="number"
              name="stock"
              label="Estoque"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <Input
              id="category"
              type="text"
              name="category"
              label="Categoria"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <div className="form-actions">
              <Button type="submit" variant="primary">
                {editingId ? 'Atualizar' : 'Criar'} Produto
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="products-list">
        {products.map((product) => (
          <Card key={product.id} className="product-management-item">
            <div className="item-content">
              <div className="item-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="item-meta">
                  <span>R$ {product.price.toFixed(2)}</span>
                  <span>Estoque: {product.stock}</span>
                  <span>Categoria: {product.category}</span>
                </div>
              </div>

              <div className="item-actions">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
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
