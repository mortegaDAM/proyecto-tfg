import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"
import { useEffect, useRef, useState } from "react";
import "../styles/hooks/ComprobarSesion.css";
import { useNotification } from "./NotificationContext";
import '../styles/hooks/AuthStatus.css';

export const ComprobarSesion = () => {
    const { user, perfil } = useAuth();
    const { showNotification } = useNotification();
    const [session, setSession] = useState(localStorage.getItem('cliente_dando_la_vez'));
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    // comprueba que el usuario ya está en la tabla cliente
    const [usuarioCliente, setUsuarioCliente] = useState(false);
    const navigate = useNavigate();
    const now = new Date().getTime();
    const expira = now + (16 * 60 * 60 * 1000); // 16h en milisegundos

    const peticionRealizada = useRef(false);

    useEffect(() => {
        const registrarCliente = async () => {
            if (user && perfil && !peticionRealizada.current) {
                peticionRealizada.current = true;
                try {
                    const respuesta = await fetch("http://localhost:8080/api/clientes/create", {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ nombre: perfil!.nombre, email: perfil!.email, uid: perfil!.uid })
                    });

                    if (!respuesta.ok) {
                        showNotification("Error", "Error al entrar en el mercado.", "error");
                        navigate('/');
                    } else {
                        setUsuarioCliente(true);
                    }
                } catch (e) {
                    showNotification("Error", "Error conectando con el servidor.", "error");
                }
            }
        }

        if (user && perfil) {
            registrarCliente();
        }

        if (session) {
            const { expira } = JSON.parse(session);
            if (expira < now) {
                localStorage.removeItem('cliente_dando_la_vez');
                setSession(null);
            }
        }

    }, [user, perfil]);


    const handleSession = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const respuesta = await fetch("http://localhost:8080/api/clientes/create", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nombre: nombreCliente, email: emailCliente })
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                // guardo en la sesion el uid, nombre, email y cuando caduca la sesion
                localStorage.setItem('cliente_dando_la_vez', JSON.stringify({ uid: datos.data.uid, nombre: datos.data.nombre, email: datos.data.email, expira }));
                setSession(localStorage.getItem('cliente_dando_la_vez'));
            } else {
                showNotification("Error", "No se pudo registrar la sesión del cliente.", "error");
            }

        } catch (error) {
            showNotification("Error", "No se pudo registrar la sesión del cliente.", "error");
        }
    }

    if (user && !usuarioCliente) {
        return (
            <div className="auth-loading">
                <div className="auth-loading-content">
                    <div className="auth-spinner">
                        <div className="auth-spinner-ring" />
                    </div>
                    <h2 className="auth-loading-title">Dando La Vez</h2>
                    <p className="auth-loading-text">Verificando el acceso al mercado...</p>
                </div>
            </div>
        );
    }

    if (session || usuarioCliente) {
        return <Outlet />;
    }

    return (
        <div className="session-container">
            <div className="session-card">
                <h1 className="session-title">Acceder al Mercado</h1>
                <p className="session-subtitle">Por favor, indícanos tu nombre y correo para continuar al mercado.</p>
                <form className="session-form" onSubmit={handleSession}>
                    <div className="form-group">
                        <label htmlFor="nombreCliente">Nombre*</label>
                        <input className="form-input" placeholder="Tu nombre" type="text" name="nombreCliente" id="nombreCliente" required onChange={event => setNombreCliente(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailCliente">Correo Electrónico*</label>
                        <input className="form-input" placeholder="tu@email.com" type="email" name="emailCliente" id="emailCliente" required onChange={event => setEmailCliente(event.target.value)} />
                    </div>
                    <button className="btn-submit" type="submit">Acceder</button>
                </form>
            </div>
        </div>
    );

}