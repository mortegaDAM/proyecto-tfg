import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

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

    // Se puede hacer con Link -> Lo que mejor quede 
    const handleMisDatos = () => {
        navigate(`/mi-cuenta/datos`);
    }

    // Igual que MisDatos
    const handleMisPuestos = () => {
        navigate(`/mi-cuenta/puestos`);
    }

    return (
        <>
            <h1>Mi Cuenta</h1>
            <h2>{perfil?.nombre}</h2>
            <button onClick={handleMisDatos}>Mis Datos</button>
            <button onClick={handleMisPuestos}>Mis Puestos</button>
            <button onClick={handleCloseSession}>Cerrar Sesion</button>
        </>
    );
}