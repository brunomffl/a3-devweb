import { useEffect, useState } from "react";
import { albumService } from "../services/albumService";
import { artistService } from "../services/artistService";
import { useNavigate, useParams } from "react-router-dom";
import type { Artist } from "../services/artistService";
import "./AlbumFormPage.css";


export function AlbumFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [artistId, setArtistId] = useState("");
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks, setTracks] = useState("");

    useEffect(() => {
        artistService.getAll().then(artists => setArtists(artists));

        if (id) {
            albumService.getById(id).then(album => {
                setTitle(album.title);
                setYear(String(album.year));
                setArtistId(album.artistId);
            });
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const data = {
            title,
            year: Number(year),
            tracks: Number(tracks),
            artistId
        };

        if (id) {
            await albumService.update(id, data);
        } else {
            await albumService.create(data);
        }

        navigate("/albums");
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>{id ? "Editar Álbum" : "Novo Álbum"}</h2>

            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título"
                required
            />

            <input
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="Ano"
                type="number"
                required
            />

            <input
                value={tracks}
                onChange={e => setTracks(e.target.value)}
                placeholder="Número de faixas"
                type="number"
                required
            />

            <select
                value={artistId}
                onChange={e => setArtistId(e.target.value)}
                required
            >
                <option value="">Selecione um artista</option>

                {artists.map(artist => (
                    <option value={artist.id} key={artist.id}>
                        {artist.name}
                    </option>
                ))}
            </select>

            <button type="submit" className="btn-primary">
                Salvar
            </button>
        </form>
    );
}
