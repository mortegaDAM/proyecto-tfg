import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import './MiCuentaView.css';

export const MiCuentaView = () => {
    const navigate = useNavigate();
    const { perfil, user } = useAuth();

    // Cerrar sesion
    const handleCloseSession = async () => {
        await signOut(auth)
            .then(() => {
                alert("Se ha cerrado sesion correctamente");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert("Error al cerrar sesion");
            });
    }

    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        try {
            if (user && perfil) {
                // TODO comprobar si se elimina bien antes de borrar en firebase
                const respuesta = await fetch(`http://localhost:8080/api/usuarios/delete/${perfil.id}`, {
                    method: "DELETE"
                });

                if (respuesta.ok) {
                    await deleteUser(user)
                        .then(() => {
                            console.log("usuario borrado");
                            alert("Usuario borrado correctamente");
                            navigate(`/`);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        } catch (err) {
            console.error(err);
            alert("No se ha podido borrar el usuario");
        }
    }

    const handleMisDatos = () => {
        navigate(`/mi-cuenta/datos`);
    }

    const handleMisPuestos = () => {
        navigate(`/mi-cuenta/puestos`);
    }

    return (
        <div className="page-wrapper">
            {/* Assuming Navbar is desired here as well for consistency, though it might be in Layout */}
            <div className="account-container">
                <div className="account-card">
                    <div className="account-header">
                        <h1 className="account-title">Mi Cuenta</h1>
                        <p className="account-subtitle">Panel de control de <strong>{perfil?.nombre}</strong></p>
                    </div>

                    <div className="account-stats">
                        <div className="stat-item">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Puestos Activos</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Clientes en cola</span>
                        </div>
                    </div>

                    <div className="account-actions">
                        <button className="account-btn primary" onClick={handleMisDatos}>
                            <span>👤</span> Mis Datos
                        </button>
                        <button className="account-btn primary" onClick={handleMisPuestos}>
                            <span>🏪</span> Mis Puestos
                        </button>
                        <button className="account-btn danger" onClick={handleCloseSession}>
                            <span>🚪</span> Cerrar Sesión
                        </button>
                        <button className="account-btn danger" onClick={handleDeleteAccount}>Borrar Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
