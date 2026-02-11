import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import './MiCuentaView.css';

export const MiCuentaView = () => {
    const navigate = useNavigate();
    const { perfil } = useAuth();

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
                        <p className="account-subtitle">Hola, {perfil?.nombre}</p>
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
                    </div>
                </div>
            </div>
        </div>
    );
}