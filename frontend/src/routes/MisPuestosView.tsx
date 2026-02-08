import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthProvider";
import { type Puesto } from "../interfaces/interfaces";

export const MisPuestosView = () => {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const [puestos, setPuestos] = useState<Puesto[]>();

    useEffect(() => {

        const fetchData = async () => {
            const respuesta = await fetch(`http://localhost:8080/api/usuarios/listaPuestos/${perfil?.id}`);
            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPuestos(datos.data);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Mis Puestos</h1>
            {!puestos ? (
                <h2>Error al cargar los puestos</h2>
            ) : (
                puestos.map((puesto: Puesto) => (
                    <section key={puesto.id}>
                        <h2>{puesto.nombre}</h2>
                    </section>
                ))
            )}
            <button onClick={() => navigate('nuevo')}>Añadir nuevo puesto</button>
        </>
    )
}