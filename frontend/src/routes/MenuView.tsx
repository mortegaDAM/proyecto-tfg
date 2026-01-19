import type { User } from "firebase/auth";
import { Link, useParams, useOutletContext, Outlet } from "react-router-dom";

interface OutletContext {
    user: User,
    perfil: string,
    loading: boolean
}

export const MenuView = () => {
    let { nombreUsuario } = useParams();
    const { user, perfil, loading } = useOutletContext<OutletContext>();
    nombreUsuario = perfil;

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
                        <Link to="/search" >Buscar</Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link to="/login" >Iniciar Sesión</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to={`/${nombreUsuario}`} >Mi Cuenta</Link>
                        </li>
                    )}

                </ul>
            </nav>
            <Outlet context={{ user, perfil, loading }} />
        </>

    );
}
