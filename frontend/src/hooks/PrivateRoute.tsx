import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthProvider";


export const PrivateRoute = () => {
    const { user, perfil } = useAuth();

    if (!user || !perfil) {
        return <Navigate to="/" />
    }

    return (<Outlet />);
}