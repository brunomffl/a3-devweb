import { useEffect, useState } from "react";
import { artistService } from "../services/artistService";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { Artist } from "../services/artistService";
import "./ArtistsPage.css";


export function ArtistsPage() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        artistService.getAll().then(artists => setArtists(artists));
    }, []);

    return (
        <div className="page-container">
            <h1>Artistas</h1>

            {user?.role === "ADMIN" && (
                <button onClick={() => navigate("/artists/new")} className="btn-primary">
                    Novo Artista
                </button>
            )}

            <div className="list-container">
                {artists.map(artist => (
                    <div key={artist.id} className="card">
                        <h3>{artist.name}</h3>

                        {user?.role === "ADMIN" && (
                            <>
                                <button onClick={() => navigate(`/artists/edit/${artist.id}`)}>
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        artistService.delete(artist.id).then(() => {
                                            setArtists(prev =>
                                                prev.filter(a => a.id !== artist.id)
                                            );
                                        })
                                    }
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
