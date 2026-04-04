import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import '../styles/routes/MiCuentaView.css';
import { useEffect, useState } from "react";
import { ModalView } from "../components/Modal";
import { useNotification } from "../hooks/NotificationContext";
import { type Puesto } from "../interfaces/interfaces";

export const MiCuentaView = () => {
    const navigate = useNavigate();
    const { perfil, user } = useAuth();
    const { showNotification } = useNotification();

    const [puestosCount, setPuestosCount] = useState(0);
    const [loadingStats, setLoadingStats] = useState(true);

    // Variables modal
    const [abrirModal, setAbrirModal] = useState(false);
    const [tituloModal, setTituloModal] = useState("");
    const [mensajeModal, setMensajeModal] = useState("");
    const [aceptarModal, setAceptarModal] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            if (!perfil) return;
            try {
                const respuesta = await fetch(`http://localhost:8080/api/usuarios/listaPuestos/${perfil.id}`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setPuestosCount(datos.data.length);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, [perfil]);

    // Cerrar sesión
    const handleCloseSession = async () => {
        await signOut(auth)
            .then(() => {
                showNotification("Sesión cerrada", "Has salido de tu cuenta correctamente.", "success");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                showNotification("Error", "No se pudo cerrar la sesión.", "error");
            });
    }

    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        try {
            if (user && perfil) {
                const respuesta = await fetch(`http://localhost:8080/api/usuarios/delete/${perfil.id}`, {
                    method: "DELETE"
                });

                if (respuesta.ok) {
                    await deleteUser(user)
                        .then(() => {
                            showNotification("Cuenta eliminada", "Tu cuenta ha sido borrada permanentemente.", "success");
                            navigate(`/`);
                        })
                        .catch(err => console.log(err));
                }
            }
        } catch (err) {
            console.error(err);
            showNotification("Error", "No se ha podido borrar el usuario.", "error");
        }
    }

    const modalCerrarSesion = () => {
        setAbrirModal(true);
        setAceptarModal(true);
        setTituloModal("Cerrar Sesión");
        setMensajeModal("¿Estás seguro de que quieres cerrar tu sesión actual?");
    }

    const modalEliminarCuenta = () => {
        setAbrirModal(true);
        setAceptarModal(false);
        setTituloModal("Borrar Cuenta");
        setMensajeModal("Esta acción es irreversible. Se borrarán todos tus datos y puestos asociados.");
    }

    return (
        <div className="page-wrapper">
            <div className="account-container">
                <div className="account-grid">
                    {/* Sidebar / Profile Info */}
                    <div className="account-sidebar">
                        <div className="profile-card">
                            <div className="profile-avatar">
                                {perfil?.nombre?.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="profile-name">{perfil?.nombre}</h2>
                            <p className="profile-email">{perfil?.email}</p>
                            <span className="profile-badge">Propietario</span>
                        </div>

                        <div className="account-stats-mini">
                            <div className="stat-mini-item">
                                <span className="stat-mini-value">{loadingStats ? '...' : puestosCount}</span>
                                <span className="stat-mini-label">Puestos</span>
                            </div>
                            <div className="stat-mini-item">
                                <span className="stat-mini-value">0</span>
                                <span className="stat-mini-label">Atendidos</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Areas */}
                    <div className="account-main">
                        <h1 className="account-section-title">Gestión de Cuenta</h1>
                        <div className="action-grid">
                            <button className="action-card" onClick={() => navigate('/mi-cuenta/datos')}>
                                <div className="action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <h3>Mis Datos</h3>
                                    <p>Edita tu información personal y perfil.</p>
                                </div>
                                <div className="action-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                </div>
                            </button>

                            <button className="action-card" onClick={() => navigate('/mi-cuenta/puestos')}>
                                <div className="action-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <div className="action-info">
                                    <h3>Mis Puestos</h3>
                                    <p>Gestiona tus locales y colas de clientes.</p>
                                </div>
                                <div className="action-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                </div>
                            </button>
                        </div>

                        <h2 className="account-section-title danger-title">Seguridad y Acceso</h2>
                        <div className="danger-zone">
                            <button className="danger-item" onClick={modalCerrarSesion}>
                                <div className="danger-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                </div>
                                <span>Cerrar Sesión</span>
                            </button>
                            <button className="danger-item delete" onClick={modalEliminarCuenta}>
                                <div className="danger-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </div>
                                <span>Eliminar Cuenta</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalView
                abierto={abrirModal}
                titulo={tituloModal}
                mensaje={mensajeModal}
                cancelar={() => setAbrirModal(false)}
                aceptar={aceptarModal ? handleCloseSession : handleDeleteAccount}
                condicional={true}
            />
        </div>
    );
}
