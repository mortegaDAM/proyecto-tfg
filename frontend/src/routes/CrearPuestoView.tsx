import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Mercados } from "../interfaces/interfaces";

export const CrearPuestoView = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mercados, setMercados] = useState<Mercados[]>();
    const [mercadoSeleccionado, setMercadoSeleccionado] = useState('');
    const abierto = false;

    useEffect(() => {
        const fetchData = async () => {
            const respuesta = await fetch("http://localhost:8080/api/mercados/getAll");
            const datos = await respuesta.json();
            setMercados(datos.data);
        }
        fetchData();
    }, [])


    // TODO crear el puesto
    const handleOnSubmit = () => {
        console.log("Creando nuevo puesto...");
        navigate("/mi-cuenta/puestos");
    }
    // TODO: tickets para nuevos mercados
    return (
        <div>
            <h1>Nuevo Puesto</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="text" value={nombre} placeholder="Nombre" required
                    onChange={(event) => {
                        setNombre(event.target.value);
                    }}
                />
                <select value={mercadoSeleccionado}
                    onChange={event => setMercadoSeleccionado(event.target.value)}>
                    {
                        !mercados ? (
                            <option value={0}>Error al cargar los mercados</option>
                        ) : (
                            mercados.map((mercado: Mercados) => (
                                <option key={mercado.id} value={mercado.id}>{mercado.nombre}</option>
                            ))
                        )
                    }
                </select>
                <button type="submit">Añadir</button>
                <button onClick={() => navigate('/mi-cuenta/puestos')}>Cancelar</button>
            </form>
            <p>¿Tu mercado no aparece en la lista? Escríbenos</p>

        </div>
    );
}