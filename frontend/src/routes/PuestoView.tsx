import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Puesto } from "../interfaces/interfaces";
import { useAuth } from "../hooks/AuthProvider";
import { useNotification } from "../hooks/NotificationContext";
import { PropietarioView } from "./PropietarioView";
import { ClienteView } from "./ClienteView";

export const PuestoView = () => {
    const { id } = useParams();
    const { user, perfil } = useAuth();
    //const location = useLocation();
    //const puesto: Puesto = location.state.puestoCompleto;
    const [puesto, setPuesto] = useState<Puesto>();
    const session = localStorage.getItem('cliente_dando_la_vez');
    const { showNotification } = useNotification();

    const [propietario, setPropietario] = useState(false);


    // Comprobar que es el dueño del puesto
    useEffect(() => {
        const fetchPropietario = async () => {
            let uid;
            try {
                if (user && perfil) {
                    uid = perfil.uid;
                }
                if (session !== null) {
                    const sessionObjeto = JSON.parse(session);
                    uid = sessionObjeto.uid;
                }


                const respuesta = await fetch(`http://localhost:8080/api/puestos/puesto/propietario/${uid}/${id}`);

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    if (datos.propietario) {
                        // TRUE -> Es propietario
                        setPropietario(true);
                    }
                    setPuesto(datos.data);
                }
            } catch (e) {
                showNotification("Error", "No se pudo comprobar la sesion", "error");
            }
        }

        fetchPropietario();

    }, []);

    if (user && !propietario) {
        return (
            <div className="auth-loading">
                <div className="auth-loading-content">
                    <div className="auth-spinner">
                        <div className="auth-spinner-ring" />
                    </div>
                    <h2 className="auth-loading-title">Dando La Vez</h2>
                    <p className="auth-loading-text">Verificando el acceso al puesto...</p>
                </div>
            </div>
        );
    }

    if (propietario) {
        return <PropietarioView {...puesto!} />
    } else {
        return <ClienteView />;
    }

}