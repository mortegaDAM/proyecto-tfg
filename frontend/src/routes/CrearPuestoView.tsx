import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Mercados } from "../interfaces/interfaces";
import './CrearPuestoView.css';

export const CrearPuestoView = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mercados, setMercados] = useState<Mercados[]>();
    const [mercadoSeleccionado, setMercadoSeleccionado] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await fetch("http://localhost:8080/api/mercados/getAll");
                const datos = await respuesta.json();
                setMercados(datos.data);
                if (datos.data && datos.data.length > 0) {
                    setMercadoSeleccionado(datos.data[0].id);
                }
            } catch (error) {
                console.error("Error al cargar mercados:", error);
            }
        }
        fetchData();
    }, [])

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Creando nuevo puesto...", { nombre, mercadoSeleccionado });
        navigate("/mi-cuenta/puestos");
    }

    return (
        <div className="create-puesto-container">
            <div className="create-puesto-card">
                <h1 className="create-puesto-title">Nuevo Puesto</h1>
                <form onSubmit={handleOnSubmit} className="create-puesto-form">
                    <input
                        type="text"
                        className="create-puesto-input"
                        value={nombre}
                        placeholder="Nombre del Puesto"
                        required
                        onChange={(event) => setNombre(event.target.value)}
                    />
                    <select
                        className="create-puesto-select"
                        value={mercadoSeleccionado}
                        onChange={event => setMercadoSeleccionado(event.target.value)}
                        required
                    >
                        <option value="" disabled>Selecciona un mercado</option>
                        {
                            !mercados ? (
                                <option value="0">Cargando mercados...</option>
                            ) : (
                                mercados.map((mercado: Mercados) => (
                                    <option key={mercado.id} value={mercado.id}>
                                        {mercado.nombre}
                                    </option>
                                ))
                            )
                        }
                    </select>
                    <div className="create-puesto-actions">
                        <button type="submit" className="create-puesto-btn">
                            Añadir Puesto
                        </button>
                        <button
                            type="button"
                            className="create-puesto-cancel-btn"
                            onClick={() => navigate('/mi-cuenta/puestos')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                <div className="create-puesto-footer">
                    <p>¿Tu mercado no aparece en la lista? <a href="mailto:soporte@tfg.com">Escríbenos</a></p>
                </div>
            </div>
        </div>
    );
}
