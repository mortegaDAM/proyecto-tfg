import { type Modal } from '../interfaces/interfaces'
import '../styles/components/Modal.css'

export const ModalView = ({ abierto, titulo, mensaje, cancelar, aceptar, condicional, tipo }: Modal) => {

    if (!abierto) {
        return null;
    }

    // Modal INFORMATIVO → toast esquina inferior derecha
    if (!condicional) {
        const getIcon = () => {
            switch (tipo) {
                case 'success':
                    return (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    );
                case 'error':
                    return (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    );
                default:
                    return (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    );
            }
        };

        return (
            <div className="toast-container">
                <div className={`toast toast--${tipo || 'info'}`}>
                    <div className="toast-icon">
                        {getIcon()}
                    </div>
                    <div className="toast-body">
                        <h4 className="toast-title">{titulo}</h4>
                        <p className="toast-message">{mensaje}</p>
                    </div>
                    <button className="toast-close" onClick={cancelar} aria-label="Cerrar notificación">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    // Modal de CONFIRMACIÓN → centrado con overlay oscuro
    return (
        <div className="confirm-overlay" onClick={cancelar}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="confirm-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h2 className="confirm-title">{titulo}</h2>
                <p className="confirm-message">{mensaje}</p>
                <div className="confirm-actions">
                    <button className="confirm-btn confirm-btn--cancel" onClick={cancelar}>Cancelar</button>
                    <button className="confirm-btn confirm-btn--accept" onClick={aceptar}>Aceptar</button>
                </div>
            </div>
        </div>
    );
}