import { Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const AuthStatus = () => {
    const { user, perfil, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>
    }

    // Se queda cargando si no esta iniciado sesion

    return (

        <Outlet context={{ user, perfil, loading }} />

    );
}