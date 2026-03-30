import { useNavigate } from "react-router-dom";
import './MisPuestosView.css';
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { type Puesto } from "../interfaces/interfaces"; const MOCK_PUESTOS: Puesto[] = [
    {
        id: 1,
        nombre: "Frutas y Verduras Mario",
        abierto: true,
        listaClientes: []
    },
    {
        id: 2,
        nombre: "Carnicería El Chuleton",
        abierto: false,
        listaClientes: []
    },
    {
        id: 3,
        nombre: "Pescadería La Mar",
        abierto: true,
        listaClientes: []
    }
];

export const MisPuestosView = () => {
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const [puestos, setPuestos] = useState<Puesto[]>();

    useEffect(() => {
        const fetchData = async () => {
            if (!perfil) return;
            const respuesta = await fetch(`http://localhost:8080/api/usuarios/listaPuestos/${perfil?.id}`);
            if (respuesta.ok) {
                const datos = await respuesta.json();
                setPuestos(datos.data);
            }
        }

        fetchData();
    }, [perfil]);

    const handleOnClick = () => {
        navigate('/mi-cuenta/puestos/nuevo');
    }

    const handleOnEdit = () => {
        // redirigir a la edicion
    }

    const handleOnDelete = () => {
        // mostrar un alert o modal que avise de que vas a borrarlo
        // llamar a la api y borrarlo y que se actualice la lista de puetos
    }

    // Usamos los puestos del estado si existen, si no los de mock para visualización
    const displayPuestos = puestos && puestos.length > 0 ? puestos : MOCK_PUESTOS;

    return (
        <div className="page-wrapper">
            <div className="puestos-container">
                <div className="puestos-header">
                    <h1 className="puestos-title">Mis Puestos</h1>
                    <button className="add-puesto-btn" onClick={handleOnClick}>
                        <span>+</span> Añadir Nuevo
                    </button>
                </div>

                <div className="puestos-grid">
                    {displayPuestos.map((puesto) => (
                        <div key={puesto.id} className="puesto-card">
                            <div className="puesto-image-placeholder">
                                🏪
                            </div>
                            <div className="puesto-content">
                                <h2 className="puesto-name">{puesto.nombre}</h2>
                                <p className="puesto-status">
                                    Estado: <span className={puesto.abierto ? "status-abierto" : "status-cerrado"}>
                                        {puesto.abierto ? "Abierto" : "Cerrado"}
                                    </span>
                                </p>

                                <div className="puesto-actions">
                                    <button className="puesto-btn edit" onClick={handleOnEdit}>Editar</button>
                                    <button className="puesto-btn delete" onClick={handleOnDelete}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
