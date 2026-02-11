import { useNavigate } from "react-router-dom";
import './MisPuestosView.css';

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
    )
}