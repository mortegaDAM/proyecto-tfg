import { Navigate, Outlet, useOutletContext } from "react-router-dom"
import type { OutletContext } from "../routes/MiCuentaView";


export const PrivateRoute = () => {
    const { user, perfil, loading } = useOutletContext<OutletContext>();

    if (!user || !perfil) {
        return <Navigate to="/" />
    }

    return (<Outlet context={{ user, perfil, loading }} />);
}