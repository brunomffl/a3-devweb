import { useEffect, useState } from "react";
import { albumService } from "../services/albumService";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Album } from "../services/albumService";
import "./AlbumsPage.css";


export function AlbumsPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        albumService.getAll().then(albums => setAlbums(albums));
    }, []);

    return (
        <div className="page-container">
            <h1>Álbuns</h1>

            {user?.role === "ADMIN" && (
                <button onClick={() => navigate("/albums/new")} className="btn-primary">
                    Novo Álbum
                </button>
            )}

            <div className="list-container">
                {albums.map(album => (
                    <div key={album.id} className="card">
                        <h3>{album.title}</h3>

                        <p>Artista: {album.artist?.name || "Sem artista"}</p>

                        {user?.role === "ADMIN" && (
                            <>
                                <button onClick={() => navigate(`/albums/edit/${album.id}`)}>
                                    Editar
                                </button>

                                <button
                                    onClick={() => {
                                        albumService.delete(album.id).then(() => {
                                            setAlbums(prev => prev.filter(a => a.id !== album.id));
                                        });
                                    }}
                                >
                                    Deletar
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
