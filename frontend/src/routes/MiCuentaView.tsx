import { signOut, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


interface OutletContext {
    user: User,
    perfil: string,
    loading: boolean
}


export const MiCuentaView = () => {
    const navigate = useNavigate();
    const { perfil } = useOutletContext<OutletContext>();

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

    return (
        <>
            <h1>Mi Cuenta</h1>
            <h2>{perfil}</h2>
            <button onClick={handleCloseSession}>Cerrar Sesion</button>
        </>
    );
}