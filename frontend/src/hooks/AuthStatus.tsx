import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const AuthStatus = () => {
    const { loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>
    }

    // Se queda cargando si no esta iniciado sesion

    return (

        <Outlet />

    );
}