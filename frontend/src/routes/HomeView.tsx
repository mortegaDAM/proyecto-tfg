
import { useEffect, useState } from "react";
import type { Mercado } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

// Colores para generar imágenes placeholder dinámicas por mercado
const PLACEHOLDER_COLORS = ["e67e22", "27ae60", "2980b9", "8e44ad", "c0392b", "16a085", "d35400", "2c3e50"];

export const HomeView = () => {
    const [mercados, setMercados] = useState<Mercado[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getMercados = async () => {
            try {
                const respuesta = await fetch("http://localhost:8080/api/mercados/getAll");
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMercados(datos.data);
                }
            } catch (e) {
                console.error("Error fetching markets", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getMercados();
    }, []);

    const getPlaceholderImage = (nombre: string, index: number) => {
        const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
        const text = encodeURIComponent(nombre);
        return `https://placehold.co/600x400/${color}/ffffff?text=${text}`;
    };

    return (
        <>
            <header className="section-header">
                <h2 className="section-title">Descubre tus mercados locales</h2>
                <p className="section-subtitle">Explora los mejores puestos y productos cerca de ti. Si quieres añadir un puesto a algún mercado, no dudes en registrarte.</p>
            </header>

            {loading ? (
                <div className="markets-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="market-card" style={{ opacity: 0.5, animation: "pulse 1.5s ease-in-out infinite" }}>
                            <div className="card-image-container" style={{ background: "var(--surface-secondary, #e0e0e0)" }}></div>
                            <div className="card-content">
                                <h3 className="market-title" style={{ background: "var(--surface-secondary, #e0e0e0)", color: "transparent", borderRadius: "4px" }}>Cargando...</h3>
                                <p className="market-description" style={{ background: "var(--surface-secondary, #e0e0e0)", color: "transparent", borderRadius: "4px" }}>Cargando descripción del mercado...</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="section-header">
                    <p className="section-subtitle">No se pudieron cargar los mercados. Asegúrate de que el servidor esté en funcionamiento.</p>
                </div>
            ) : mercados.length === 0 ? (
                <div className="section-header">
                    <p className="section-subtitle">No hay mercados disponibles en este momento.</p>
                </div>
            ) : (
                <div className="markets-grid">
                    {mercados.map((mercado, index) => (
                        <div key={mercado.id} className="market-card">
                            <Link to={`mercado/${mercado.id}`} state={{ nombreMercado: mercado.nombre }} className="market-link">
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