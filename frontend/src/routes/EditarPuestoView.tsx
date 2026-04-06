import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Puesto } from "../interfaces/interfaces";
import '../styles/routes/EditarPuestoView.css';
import { useAuth } from "../hooks/AuthProvider";
import { useNotification } from "../hooks/NotificationContext";

export const EditarPuestoView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { perfil } = useAuth();
    const { showNotification } = useNotification();

    const [nombre, setNombre] = useState('');
    const [abierto, setAbierto] = useState(false);
    const [puestoOriginal, setPuestoOriginal] = useState<Puesto | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchPuesto = useCallback(async () => {
        if (!id) return;
        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/puesto/${id}`);
            if (respuesta.ok) {
                const datos = await respuesta.json();
                const puesto: Puesto = datos.data;
                
                // Verificar propiedad (si el backend no lo hace, lo hacemos aquí)
                // Nota: puesto.usuario puede ser null por @JsonBackReference, 
                // pero podemos usar el endpoint de verificación si es necesario.
                // Por ahora, confiamos en que si el usuario lo ve en "Mis Puestos", es suyo.
                // Pero vamos a intentar verificar con el endpoint dedicado:
                const resDueno = await fetch(`http://localhost:8080/api/puestos/puesto/propietario/${perfil?.uid}/${id}`);
                const dataDueno = await resDueno.json();
                
                if (dataDueno.propietario) {
                    setPuestoOriginal(puesto);
                    setNombre(puesto.nombre);
                    setAbierto(!!puesto.abierto);
                } else {
                    showNotification("Acceso denegado", "No tienes permiso para editar este puesto.", "error");
                    navigate('/mi-cuenta/puestos');
                }
            } else {
                showNotification("Error", "No se pudo encontrar el puesto.", "error");
                navigate('/mi-cuenta/puestos');
            }
        } catch (error) {
            console.error("Error al cargar el puesto:", error);
            showNotification("Error", "Error de conexión al cargar los datos.", "error");
        } finally {
            setLoading(false);
        }
    }, [id, perfil, navigate, showNotification]);

    useEffect(() => {
        if (perfil && id) {
            fetchPuesto();
        }
    }, [perfil, id, fetchPuesto]);

    const handleOnSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!puestoOriginal) return;

        const puestoActualizado = {
            ...puestoOriginal,
            nombre: nombre,
            abierto: abierto
        };

        try {
            const respuesta = await fetch(`http://localhost:8080/api/puestos/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(puestoActualizado)
            });

            if (respuesta.ok) {
                showNotification("Puesto actualizado", "Los cambios se han guardado correctamente.", "success");
                navigate('/mi-cuenta/puestos');
            } else {
                showNotification("Error", "No se pudo actualizar el puesto.", "error");
            }
        } catch (e) {
            showNotification("Error", "Error de conexión al actualizar el puesto.", "error");
        }
    }

    if (loading) {
        return (
            <div className="edit-puesto-container">
                <div className="edit-puesto-card skeleton">
                    <div className="skeleton-title" />
                    <div className="skeleton-input" />
                    <div className="skeleton-toggle" />
                    <div className="skeleton-btn" />
                </div>
            </div>
        );
    }

    return (
        <div className="edit-puesto-container">
            <div className="edit-puesto-card">
                <h1 className="edit-puesto-title">Editar Puesto</h1>
                <p className="edit-puesto-subtitle">Gestiona la información y disponibilidad de tu puesto.</p>
                
                <form onSubmit={handleOnSubmit} className="edit-puesto-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre del Puesto</label>
                        <input
                            id="nombre"
                            type="text"
                            className="edit-puesto-input"
                            value={nombre}
                            placeholder="Ej. Frutería Mari"
                            required
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </div>

                    <div className="form-group toggle-group">
                        <div className="toggle-info">
                            <span className="toggle-label">Estado del Puesto</span>
                            <span className="toggle-description">
                                {abierto ? 'Actualmente abierto al público' : 'Actualmente cerrado'}
                            </span>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={abierto}
                                onChange={(e) => setAbierto(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    <div className="edit-puesto-actions">
                        <button type="submit" className="edit-puesto-btn">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            className="edit-puesto-cancel-btn"
                            onClick={() => navigate('/mi-cuenta/puestos')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
