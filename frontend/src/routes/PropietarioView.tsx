import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Puesto } from "../interfaces/interfaces";
import { useNotification } from "../hooks/NotificationContext";
import "../styles/routes/PropietarioView.css";

export const PropietarioView = (puestoInicial: Puesto) => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [puesto, setPuesto] = useState<Puesto>(puestoInicial);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const refreshPuesto = async () => {
        setIsRefreshing(true);
        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/puesto/${puesto.id}`);
            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPuesto(datos.data);
            }
        } catch (e) {
            console.error("Error al recargar puesto:", e);
            showNotification("Error", "No se pudo actualizar la información del puesto.", "error");
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleToggleState = async () => {
        setIsToggling(true);
        const newState = !puesto.abierto;
        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/update/${puesto.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ abierto: newState })
            });

            if (respuesta.ok) {
                setPuesto({ ...puesto, abierto: newState });
                showNotification("Éxito", `El puesto ahora está ${newState ? "abierto" : "cerrado"}.`, "success");
            } else {
                throw new Error("Error en la respuesta");
            }
        } catch (e) {
            console.error("Error al cambiar estado:", e);
            showNotification("Error", "No se pudo cambiar el estado del puesto.", "error");
        } finally {
            setIsToggling(false);
        }
    };

    const handleNextTurn = async () => {
        if (!puesto.listaClientes || puesto.listaClientes.length === 0) {
            showNotification("Info", "No hay nadie esperando en la cola.", "info");
            return;
        }

        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/aumentarTurno/${puesto.id}`, {
                method: "PUT"
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPuesto(datos.data);
                showNotification("Turno avanzado", "Has pasado al siguiente cliente.", "success");
            } else {
                throw new Error("Error en la respuesta");
            }
        } catch (e) {
            console.error("Error al avanzar turno:", e);
            showNotification("Error", "No se pudo avanzar el turno.", "error");
        }
    };

    const handleReset = async () => {
        const confirmar = window.confirm("¿Seguro que quieres reiniciar el turno a 0 y limpiar la cola? Esta acción no se puede deshacer.");
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/reiniciar/${puesto.id}`, {
                method: "PUT"
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPuesto(datos.data);
                showNotification("Puesto reiniciado", "El turno empieza desde 0 y la lista se ha vaciado.", "success");
            } else {
                throw new Error("Error en la respuesta");
            }
        } catch (e) {
            console.error("Error al reiniciar puesto:", e);
            showNotification("Error", "No se pudo reiniciar el turno.", "error");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="propietario-view-container">
                <header className="propietario-header">
                    <button className="back-link-btn" onClick={() => navigate('/mi-cuenta/puestos')}>
                        &larr; Volver a Mis Puestos
                    </button>
                    <h1 className="propietario-puesto-name">{puesto.nombre}</h1>
                    
                    <div className="status-toggle-wrapper">
                        <span className="status-label">{puesto.abierto ? 'Abierto' : 'Cerrado'}</span>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={puesto.abierto} 
                                onChange={handleToggleState}
                                disabled={isToggling}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </header>

                <main className="propietario-main-card">
                    <div className="turn-display-area">
                        <button 
                            className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`} 
                            onClick={refreshPuesto}
                            title="Recargar datos"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        </button>

                        <span className="section-label">Turno actual</span>
                        <div className="turn-number-box">
                            <h2 className="current-turn-number">
                                {puesto.numeroActual === 0 ? '--' : puesto.numeroActual}
                            </h2>
                        </div>
                    </div>

                    <div className="queue-section">
                        <div className="queue-header">
                            <span className="queue-title">Clientes en espera</span>
                            <span className="queue-count">{puesto.listaClientes?.length || 0}</span>
                        </div>
                        
                        <div className="queue-list">
                            {!puesto.listaClientes || puesto.listaClientes.length === 0 ? (
                                <div className="empty-queue">
                                    No hay nadie en la cola.
                                </div>
                            ) : (
                                puesto.listaClientes.map((cliente, index) => (
                                    <div key={cliente.id} className="queue-item">
                                        <span className="client-idx">{index + 1}.</span>
                                        <span className="client-name">{cliente.nombre}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="propietario-actions">
                        <button 
                            className="next-turn-btn" 
                            onClick={handleNextTurn}
                            disabled={!puesto.abierto || !puesto.listaClientes || puesto.listaClientes.length === 0}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                            Pasar al Siguiente Turno
                        </button>
                        
                        <button 
                            className="reset-turn-btn" 
                            onClick={handleReset}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                            Reiniciar Cola (Empezar de cero)
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};