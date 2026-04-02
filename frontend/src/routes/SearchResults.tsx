import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Mercado } from "../interfaces/interfaces";

const PLACEHOLDER_COLORS = ["e67e22", "27ae60", "2980b9", "8e44ad", "c0392b", "16a085", "d35400", "2c3e50"];

export const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [mercados, setMercados] = useState<Mercado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const respuesta = await fetch(`http://localhost:8080/api/mercados/buscar?name=${query}`);
                    if (respuesta.ok) {
                        const datos = await respuesta.json();
                        setMercados(datos.data);
                    }
                } catch (e) {
                    console.error("Error buscando mercados", e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }
        fetchData();
    }, [query]);

    const getPlaceholderImage = (nombre: string, index: number) => {
        const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
        const text = encodeURIComponent(nombre);
        return `https://placehold.co/600x400/${color}/ffffff?text=${text}`;
    };

    return (
        <>
            <header className="section-header">
                <h2 className="section-title">Resultados de "{query}"</h2>
                <p className="section-subtitle">
                    {loading ? "Buscando mercados..." : `${mercados.length} mercado${mercados.length !== 1 ? 's' : ''} encontrado${mercados.length !== 1 ? 's' : ''}`}
                </p>
            </header>

            {loading ? (
                <div className="markets-grid">
                    {[1, 2].map((i) => (
                        <div key={i} className="market-card" style={{ opacity: 0.5, animation: "pulse 1.5s ease-in-out infinite" }}>
                            <div className="card-image-container" style={{ background: "var(--surface-secondary, #e0e0e0)" }}></div>
                            <div className="card-content">
                                <h3 className="market-title" style={{ background: "var(--surface-secondary, #e0e0e0)", color: "transparent", borderRadius: "4px" }}>Cargando...</h3>
                                <p className="market-description" style={{ background: "var(--surface-secondary, #e0e0e0)", color: "transparent", borderRadius: "4px" }}>Cargando descripción...</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : mercados.length === 0 ? (
                <div className="section-header">
                    <p className="section-subtitle">No se encontraron mercados que coincidan con "{query}".</p>
                </div>
            ) : (
                <div className="markets-grid">
                    {mercados.map((mercado, index) => (
                        <div key={mercado.id} className="market-card">
                            <Link to={`/mercado/${mercado.id}`} state={{ nombreMercado: mercado.nombre }} className="market-link">
                                <div className="card-image-container">
                                    <img src={getPlaceholderImage(mercado.nombre, index)} alt={mercado.nombre} className="card-image" />
                                </div>
                                <div className="card-content">
                                    <h3 className="market-title">{mercado.nombre}</h3>
                                    <p className="market-description">{mercado.descripcion}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}