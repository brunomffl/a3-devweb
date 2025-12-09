import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { artistService } from '../services/artistService';
import type { Artist } from '../services/artistService';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { Input } from '../components/Input';
import "./HomePage.css";


export const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      setIsLoading(true);
      const data = await artistService.getAll();
      setArtists(data);
      setFilteredArtists(data);
    } catch (err) {
      setToast({ message: 'Erro ao carregar artistas', type: 'error' });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.genre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.country?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(artists);
    }
  };

    const handleClear = () => {
        setSearchQuery("");
        setFilteredArtists(artists);
    };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Bem-vindo à Música</h1>
          <p>Descubra artistas incríveis de todo o mundo</p>
        </div>
      </div>

      <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
              <Input
                  type="text"
                  placeholder="Buscar por artista, gênero ou país..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button type="submit" variant="primary">
                  Buscar
              </Button>

              {searchQuery.trim().length > 0 && (
                  <Button
                      type="button"
                      variant="secondary"
                      className="btn-secondary"
                      onClick={handleClear}
                  >
                      Limpar
                  </Button>
              )}
          </form>
      </div>

      <div className="artists-section">
        <h2>Artistas</h2>
        {isLoading ? (
          <div className="loading">Carregando artistas...</div>
        ) : filteredArtists.length > 0 ? (
          <div className="artists-grid">
            {filteredArtists.map((artist) => (
              <Card key={artist.id} className="artist-card">
                <div className="artist-image">
                  {artist.imageUrl ? (
                    <img src={artist.imageUrl} alt={artist.name} />
                  ) : (
                    <div className="image-placeholder">
                      <Music size={48} />
                    </div>
                  )}
                </div>
                <h3>{artist.name}</h3>
                {artist.genre && <p className="artist-genre">{artist.genre}</p>}
                {artist.country && <p className="artist-country">{artist.country}</p>}
                {artist.biography && (
                  <p className="artist-biography">{artist.biography.substring(0, 100)}...</p>
                )}
                <div className="artist-actions">
                  <Link to={`/artist/${artist.id}`} style={{ width: '100%' }}>
                    <Button variant="primary" className="w-full">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="no-results">Nenhum artista encontrado</div>
        )}
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
