import { useState, useEffect } from "react";
import { artistService } from "../services/artistService";
import { useNavigate, useParams } from "react-router-dom";
import "./ArtistFormPage.css";

export function ArtistFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");

    useEffect(() => {
        if (id) {
            artistService.getById(id).then(artist => setName(artist.name));
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (id) {
            await artistService.update(id, { name });
        } else {
            await artistService.create({ name });
        }

        navigate("/artists");
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>{id ? "Editar Artista" : "Novo Artista"}</h2>

            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nome do artista"
            />

            <button type="submit" className="btn-primary">
                Salvar
            </button>
        </form>
    );
}
