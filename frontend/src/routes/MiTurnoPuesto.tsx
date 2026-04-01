import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import "./MiTurnoPuesto.css";

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
      fetchCliente();
      fetchPuesto();
    }
  }, [perfil, idPuesto, fetchCliente, fetchPuesto]);

  const pedirTurno = async () => {
    if (!puesto || !cliente) return;

    const updatedPuesto = {
      ...puesto,
      listaClientes: [...puesto.listaClientes, cliente]
    };

    try {
      const response = await fetch(`http://localhost:8080/api/puestos/update/${idPuesto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPuesto)
      });

      if (response.ok) {
        // Refrescar el puesto
        fetchPuesto();
      } else {
        setError("Error al pedir turno");
      }
    } catch {
      setError("Error al pedir turno");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!puesto || !cliente) return <div>No se pudo cargar la información</div>;

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
            className="mi-turno-btn"
            onClick={() => window.history.back()}
          >
            Volver al Mercado
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
