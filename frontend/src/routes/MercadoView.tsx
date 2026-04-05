import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import type { Puesto } from "../interfaces/interfaces";
import "../styles/routes/MercadoView.css";
import { useNotification } from "../hooks/NotificationContext";

export const MercadoView = () => {
    // cojo el id como parámetro de la url (ruta)
    const { id } = useParams();
    const [puestos, setPuestos] = useState<Puesto[]>();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const location = useLocation();

    // Paso el nombre del mercado por el state 
    // para no tener que hacer una llamada a la API para un único valor
    const nombre = location.state?.nombreMercado || null;

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
                showNotification("Error", "No se pudieron cargar los puestos del mercado.", "error");
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
        <div className="mercado-view-container">
            <header className="mercado-header">
                <h1 className="mercado-title">{nombre}</h1>
                <p className="mercado-subtitle">Descubre los puestos disponibles y pide tu turno.</p>
            </header>
            <button onClick={() => navigate(-1)}>Volver atrás...</button>
            <section className="puestos-grid">
                {!puestos || puestos.length === 0 ? (
                    <div className="empty-state">
                        <h2>El mercado está vacío</h2>
                        <p>Aún no hay puestos registrados en este mercado, o han ocurrido problemas al cargarlos.</p>
                    </div>
                ) : (
                    puestos.map((puesto: Puesto) => (
                        <div className="puesto-card" key={puesto.id}>
                            <div className="puesto-icon">🏪</div>
                            <h2 className="puesto-name">{puesto.nombre}</h2>
                            <span className={`status-badge ${puesto.abierto ? 'open' : 'closed'}`}>
                                {puesto.abierto ? 'Abierto' : 'Cerrado'}
                            </span>
                            {puesto.abierto ?
                                <Link to={`/puesto/${puesto.id}`}> Pedir turno</Link> :
                                <p>No se puede pedir turno</p>
                            }
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}


