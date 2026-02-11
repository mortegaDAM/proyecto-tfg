import { useNavigate } from "react-router-dom";
import './MisPuestosView.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthProvider";
import { type Puesto } from "../interfaces/interfaces";

// Inteface for visualization (mock)
interface Puesto {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
}

const MOCK_PUESTOS: Puesto[] = [
    {
        id: 1,
        nombre: "Frutería Pepe",
        descripcion: "Las mejores frutas de temporada traídas directamente del campo.",
        imagen: "https://placehold.co/600x400/orange/white?text=Fruteria"
    },
    {
        id: 2,
        nombre: "Carnicería Los Hermanos",
        descripcion: "Carnes selectas y cortes premium con la mejor calidad.",
        imagen: "https://placehold.co/600x400/red/white?text=Carniceria"
    },
    {
        id: 3,
        nombre: "Pescadería Mar Azul",
        descripcion: "Pescado fresco del día, traído de las mejores lonjas.",
        imagen: "https://placehold.co/600x400/blue/white?text=Pescaderia"
    }
];



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

    const handleOnClick = () => {
        // Navigate to add puesto or open modal
        alert("Navegar a crear puesto (Falta implementar vista)");
    }

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
                    {MOCK_PUESTOS.map((puesto) => (
                        <div key={puesto.id} className="puesto-card">
                            <div className="puesto-image-container">
                                <img src={puesto.imagen} alt={puesto.nombre} className="puesto-image" />
                            </div>
                            <div className="puesto-content">
                                <h2 className="puesto-name">{puesto.nombre}</h2>
                                <p className="puesto-description">{puesto.descripcion}</p>

                                <div className="puesto-actions">
                                    <button className="puesto-btn edit">Editar</button>
                                    <button className="puesto-btn delete">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        /*<>
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
           */
    )
}