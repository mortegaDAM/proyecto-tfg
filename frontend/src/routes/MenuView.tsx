import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const MenuView = () => {
    const { user } = useAuth();

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
                            <Link to="/mi-cuenta" >Mi Cuenta</Link>
                        </li>
                    )}

                </ul>
            </nav>
            <Outlet />
        </>

    );
}
