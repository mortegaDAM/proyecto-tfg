import { useNavigate } from "react-router-dom";
import { type Puesto } from "../interfaces/interfaces";
import "../styles/routes/ClienteView.css";

interface ClienteViewProps {
    puesto: Puesto;
}

export const ClienteView = ({ puesto }: ClienteViewProps) => {
    const navigate = useNavigate();

    if (!puesto) {
        return (
            <div className="auth-loading">
                <div className="auth-loading-content">
                    <div className="auth-spinner">
                        <div className="auth-spinner-ring" />
                    </div>
                    <p className="auth-loading-text">Cargando información del puesto...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <div className="cliente-view-container">
                <header className="cliente-header">
                    <button className="back-link-btn" onClick={() => navigate(-1)}>
                        &larr; Volver al Mercado
                    </button>
                    <h1 className="cliente-puesto-name">{puesto.nombre}</h1>
                    <div className="puesto-status-badge">
                        <span className={`status-dot ${puesto.abierto ? 'status-open' : 'status-closed'}`}></span>
                        {puesto.abierto ? 'Abierto' : 'Cerrado'}
                    </div>
                </header>

                <main className="cliente-main-card">
                    <div className="current-turn-section">
                        <span className="section-label">Ahora va por el</span>
                        <div className="current-turn-number">
                            {puesto.numeroActual === 0 ? '--' : puesto.numeroActual}
                        </div>
                    </div>

                    <div className="queue-info-section">
                        <div className="queue-stat">
                            <span className="stat-value">{puesto.listaClientes?.length || 0}</span>
                            <span className="stat-label">En cola</span>
                        </div>
                    </div>

                    <div className="cliente-actions">
                        {puesto.abierto ? (
                            <button 
                                className="pedir-turno-primary-btn"
                                onClick={() => navigate(`/puesto/${puesto.id}/turno`)}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                                Pedir Turno
                            </button>
                        ) : (
                            <div className="puesto-closed-msg">
                                <p>Este puesto está cerrado actualmente. Vuelve más tarde.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}