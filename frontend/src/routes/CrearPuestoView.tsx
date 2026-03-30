import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Mercado } from "../interfaces/interfaces";
import './CrearPuestoView.css';
import { useAuth } from "../hooks/AuthProvider";

export const CrearPuestoView = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mercados, setMercados] = useState<Mercado[]>();
    const [mercadoSeleccionado, setMercadoSeleccionado] = useState(0);
    const { perfil } = useAuth();

    useEffect(() => {
        // Llamo a todos los mercados para que se muestren en el select
        // del formulario
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
    }, []);

    // Creo el puesto con los datos -> nombre, abierto(default false), usuario y el mercado seleccionado
    const handleOnSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const respuesta = await fetch("http://localhost:8080/api/puestos/create", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nombre: nombre, abierto: false, usuario: perfil, mercado: { id: mercadoSeleccionado } })
            });

            if (respuesta.ok) {
                alert("Puesto creado correctamente");
                navigate('/mi-cuenta/puestos');
            } else {
                const error = await respuesta.json();
                console.log(error);
                alert("Se ha rechazado la solicitud. Revisa los datos");
            }
        } catch (e) {
            alert("Error al crear el nuevo puesto");
        }
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
                        onChange={event => setMercadoSeleccionado(Number(event.target.value))}
                        required
                    >
                        <option value="" disabled >Selecciona un mercado</option>
                        {
                            !mercados ? (
                                <option value="0">Cargando mercados...</option>
                            ) : (
                                mercados.map((mercado: Mercado) => (
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
