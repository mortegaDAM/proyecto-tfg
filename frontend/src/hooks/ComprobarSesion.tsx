import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"
import { useEffect, useState } from "react";
import "./ComprobarSesion.css";

export const ComprobarSesion = () => {
    const { user } = useAuth();
    const [sesion, setSesion] = useState(localStorage.getItem('cliente_dando_la_vez'));
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const now = new Date().getTime();

    console.log(sesion);

    useEffect(() => {
        if (sesion) {
            const { expira } = JSON.parse(sesion);
            if (expira < now) {
                localStorage.removeItem('cliente_dando_la_vez');
                setSesion(null);
            }
        }
    }, []);

    const handleSesion = async (e: React.FormEvent) => {
        e.preventDefault();
        const expira = now + (16 * 60 * 60 * 1000); // 16h en milisegundos

        try {
            const respuesta = await fetch("http://localhost:8080/api/clientes/create", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nombre, email })
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                // guardo en la sesion el id, nombre, email y cuando caduca la sesion
                localStorage.setItem('cliente_dando_la_vez', JSON.stringify({ id: datos.data.id, nombre: datos.data.nombre, email: datos.data.email, expira }));
                setSesion(localStorage.getItem('cliente_dando_la_vez'));
            }

        } catch (error) {
            alert("error al añadir el cliente");
        }
    }

    if (user || sesion) {
        return <Outlet />;
    }

    return (
        <div className="session-container">
            <div className="session-card">
                <h1 className="session-title">Acceder al Mercado</h1>
                <p className="session-subtitle">Por favor, indícanos tu nombre y correo para continuar al mercado.</p>
                <form className="session-form" onSubmit={handleSesion}>
                    <div className="form-group">
                        <label htmlFor="nombreCliente">Nombre*</label>
                        <input className="form-input" placeholder="Tu nombre" type="text" name="nombreCliente" id="nombreCliente" required onChange={event => setNombre(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailCliente">Correo Electrónico*</label>
                        <input className="form-input" placeholder="tu@email.com" type="email" name="emailCliente" id="emailCliente" required onChange={event => setEmail(event.target.value)} />
                    </div>
                    <button className="btn-submit" type="submit">Acceder</button>
                </form>
            </div>
        </div>
    );

}