import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import type { Puesto } from "../interfaces/interfaces";

export const MercadoView = () => {
    // cojo el id como parámetro de la url (ruta)
    const { id } = useParams();
    const sesion = localStorage.getItem('cliente_dando_la_vez');
    const [puestos, setPuestos] = useState<Puesto[]>();
    const navigate = useNavigate();
    const location = useLocation();

    // Paso el nombre del mercado por el state 
    // para no tener que hacer una llamada a la API para un único valor
    const nombre = location.state?.nombreMercado || null;
    // TODO: sacar la lista de mercados gracias al id

    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("dentro");
                const respuesta = await fetch(`http://localhost:8080/api/mercados/mercado/${id}`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setPuestos(datos.data.listaPuestos);
                    console.log("Puestos: " + puestos);
                }
            } catch (e) {
                alert("Error al sacar los puestos");
                navigate('/');
            }
        }

        if (nombre != null) {
            fetchData();
        } else {
            navigate('/');
        }
    }, []);

    return (
        <>
            <h1>Mercado {nombre}</h1>

            <section>
                {!puestos || puestos.length === 0 ? (
                    <h2>Error al cargar los puestos o lista vacía</h2>
                ) : (
                    puestos.map((puesto: Puesto) => (
                        <div className="puestos" key={puesto.id}>
                            <h2>{puesto.nombre}</h2>
                            {puesto.abierto ? (
                                <p>Abierto</p>
                            ) : (
                                <p>Cerrado</p>
                            )}
                        </div>
                    ))
                )}
            </section>

        </>
    );
}


