import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { artistService } from '../services/artistService';
import type { Artist } from '../services/artistService';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';

export const ArtistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (id) {
      loadArtist();
    }
  }, [id]);

  const loadArtist = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data = await artistService.getById(id);
        setArtist(data);
      }
    } catch (err) {
      setToast({ message: 'Erro ao carregar artista', type: 'error' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="artist-detail-page">
      <div className="detail-header">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="back-button"
        >
          <ArrowLeft size={20} /> Voltar
        </Button>
      </div>

      {isLoading ? (
        <div className="loading">Carregando informações do artista...</div>
      ) : artist ? (
        <Card className="artist-detail-card">
          <div className="artist-detail-content">
            <div className="artist-image-section">
              {artist.imageUrl ? (
                <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
              ) : (
                <div className="image-placeholder">Sem imagem</div>
              )}
            </div>
            <div className="artist-info-section">
              <h1>{artist.name}</h1>
              
              {artist.genre && (
                <div className="info-item">
                  <label>Gênero:</label>
                  <p>{artist.genre}</p>
                </div>
              )}
              
              {artist.country && (
                <div className="info-item">
                  <label>País:</label>
                  <p>{artist.country}</p>
                </div>
              )}
              
              {artist.biography && (
                <div className="info-item">
                  <label>Biografia:</label>
                  <p>{artist.biography}</p>
                </div>
              )}
              
              <div className="info-item">
                <label>Criado em:</label>
                <p>{new Date(artist.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="not-found">Artista não encontrado</div>
      )}

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
