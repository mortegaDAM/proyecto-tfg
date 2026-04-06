import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "../styles/routes/MiTurnoPuesto.css";

interface Cliente {
  id: number;
  email: string;
  nombre: string;
}

interface Puesto {
  id: number;
  nombre: string;
  listaClientes: Cliente[];
  numeroActual: number;
}

const MiTurnoPuesto: React.FC = () => {
  const { idPuesto } = useParams<{ idPuesto: string }>();
  const { perfil } = useAuth();
  const [puesto, setPuesto] = useState<Puesto | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCliente = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/clientes/cliente/${perfil!.id}`);
      if (response.ok) {
        const data = await response.json();
        setCliente(data.data);
      } else {
        setError("Cliente no encontrado");
      }
    } catch {
      setError("Error al obtener cliente");
    }
  }, [perfil]);

  const fetchPuesto = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/puestos/puesto/${idPuesto}`);
      if (response.ok) {
        const data = await response.json();
        setPuesto(data.data);
      } else {
        setError("Puesto no encontrado");
      }
    } catch {
      setError("Error al obtener puesto");
    } finally {
      setLoading(false);
    }
  }, [idPuesto]);

  useEffect(() => {
    if (perfil && idPuesto) {
      setError(null);
      fetchCliente();
      fetchPuesto();
    } else if (!perfil && !loading) {
       // Si no hay perfil y ya terminó de cargar el auth, mostrar error
       setError("No se ha podido cargar la sesión del usuario");
    }
  }, [perfil, idPuesto, fetchCliente, fetchPuesto, loading]);

  const pedirTurno = async () => {
    if (!puesto || !cliente) return;

    try {
      const response = await fetch(`http://localhost:8080/api/puestos/unirse/${idPuesto}/${cliente.id}`, {
        method: "PUT"
      });

      if (response.ok) {
        // Refrescar el puesto para ver mi posición
        fetchPuesto();
      } else {
        setError("Error al unirse a la cola. Puede que ya estés en ella.");
      }
    } catch {
      setError("Error de conexión al pedir turno");
    }
  };

  if (loading && !error) {
    return (
        <div className="auth-loading">
            <div className="auth-spinner"><div className="auth-spinner-ring"></div></div>
            <p>Cargando información de tu turno...</p>
        </div>
    );
  }
  
  if (error) return <div className="error-msg-container"><p>Error: {error}</p><button onClick={() => window.location.reload()}>Reintentar</button></div>;
  if (!puesto || !cliente) return <div className="error-msg-container"><p>No se pudo cargar la información necesaria.</p></div>;


  const indiceCliente = puesto.listaClientes.findIndex(c => c.id === cliente.id);
  const numeroTurno = indiceCliente !== -1 ? indiceCliente + 1 : null;

  return (
    <div className="mi-turno-container">
      {numeroTurno ? (
        <>
          <h1 className="mi-turno-title">Turno de {puesto.nombre}</h1>
          <div className="mi-turno-card">
            <div className="mi-turno-exito">
              ¡Ha entrado correctamente en el turno!<br />
              Aparecerá en la pantalla:
            </div>
            <div className="mi-turno-nombre-numero">
              {cliente.nombre} - {numeroTurno}
            </div>
            <div className="mi-turno-info">
              Se le informará de los cambios de la cola por el correo electrónico proporcionado
            </div>
          </div>
          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
            &larr; Volver al Mercado
          </button>
        </>
      ) : (
        <>
          <h1 className="mi-turno-title">Turno de {puesto.nombre}</h1>
          <div className="mi-turno-lista">
            <h2>Lista de turnos:</h2>
            <ul>
              {puesto.listaClientes.map((c, index) => (
                <li key={c.id}>{index + 1}. {c.nombre}</li>
              ))}
            </ul>
          </div>
          <button
            className="mi-turno-btn"
            onClick={pedirTurno}
          >
            Pedir turno
          </button>
        </>
      )}
    </div>
  );
};

export default MiTurnoPuesto;
