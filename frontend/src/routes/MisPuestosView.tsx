import { useNavigate } from "react-router-dom";
import '../styles/routes/MisPuestosView.css';
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { type Puesto } from "../interfaces/interfaces";

export const MisPuestosView = () => {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const [puestos, setPuestos] = useState<Puesto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!perfil) return;
            try {
                const respuesta = await fetch(`http://localhost:8080/api/usuarios/listaPuestos/${perfil?.id}`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setPuestos(datos.data);
                }
            } catch (e) {
                console.error("Error cargando puestos", e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [perfil]);

    const handleOnClick = () => {
        navigate('/mi-cuenta/puestos/nuevo');
    }

    const handleOnEdit = () => {
        // redirigir a la edicion
    }

    const handleOnDelete = () => {
        // mostrar un alert o modal que avise de que vas a borrarlo
        // llamar a la api y borrarlo y que se actualice la lista de puetos
    }

    return (
        <div className="page-wrapper">
            <div className="puestos-container">
                {/* Header */}
                <div className="puestos-header">
                    <div className="puestos-header-left">
                        <h1 className="puestos-title">Mis Puestos</h1>
                        {!loading && (
                            <span className="puestos-count">{puestos.length} puesto{puestos.length !== 1 ? 's' : ''}</span>
                        )}
                    </div>
                    <button className="add-puesto-btn" onClick={handleOnClick}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Añadir Nuevo
                    </button>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="puestos-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="puesto-card puesto-card--skeleton">
                                <div className="puesto-card-icon skeleton-block" />
                                <div className="puesto-content">
                                    <div className="skeleton-text skeleton-text--title" />
                                    <div className="skeleton-text skeleton-text--subtitle" />
                                    <div className="puesto-actions">
                                        <div className="skeleton-btn" />
                                        <div className="skeleton-btn" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                /* Empty */
                ) : puestos.length === 0 ? (
                    <div className="puestos-empty">
                        <div className="puestos-empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <h2 className="puestos-empty-title">Aún no tienes puestos</h2>
                        <p className="puestos-empty-text">Crea tu primer puesto para empezar a gestionar tu negocio en el mercado.</p>
                        <button className="add-puesto-btn" onClick={handleOnClick}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Crear mi primer puesto
                        </button>
                    </div>

                /* Puestos list */
                ) : (
                    <div className="puestos-grid">
                        {puestos.map((puesto) => (
                            <div key={puesto.id} className="puesto-card">
                                <div className="puesto-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <div className="puesto-content">
                                    <h2 className="puesto-name">{puesto.nombre}</h2>
                                    <span className={`puesto-status ${puesto.abierto ? 'puesto-status--open' : 'puesto-status--closed'}`}>
                                        <span className="puesto-status-dot" />
                                        {puesto.abierto ? 'Abierto' : 'Cerrado'}
                                    </span>
                                    <div className="puesto-actions">
                                        <button className="puesto-btn edit" onClick={handleOnEdit}>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Editar
                                        </button>
                                        <button className="puesto-btn delete" onClick={handleOnDelete}>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
