import type { User } from "firebase/auth";
import { Link, useOutletContext, Outlet } from "react-router-dom";
import type { UsuarioFirebase } from "../hooks/useAuth";

interface OutletContext {
    user: User,
    perfil: UsuarioFirebase,
    loading: boolean
}

export const MenuView = () => {
    const { user, perfil, loading } = useOutletContext<OutletContext>();


    return (
        <>
            <nav>
                <div>
                    <Link to="/">
                        MiLogo
                    </Link>
                </div>

                <ul>
                    <li>
                        <Link to="/buscar" >Buscar</Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link to="/login" >Iniciar Sesión</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to={`/mi-cuenta`} >Mi Cuenta</Link>
                        </li>
                    )}

                </ul>
            </nav>
            <Outlet context={{ user, perfil, loading }} />
        </>

    );
}
