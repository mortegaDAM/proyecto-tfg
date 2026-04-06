import { Link } from "react-router-dom";
import "../styles/routes/PaginaNoExistente.css";

export const PaginaNoExistente = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            <div className="not-found-card">
                <div className="not-found-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="8" y1="15" x2="16" y2="15" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                </div>
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Página No Encontrada</h2>
                <p className="not-found-text">
                    Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
                </p>
                <div className="not-found-actions">
                    <Link to={"/"} className="back-btn">&larr; Volver a Inicio</Link>
                </div>
            </div>
        </div>
    );
};