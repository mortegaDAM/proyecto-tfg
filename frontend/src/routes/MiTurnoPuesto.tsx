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
  const [localCliente] = useState<Cliente | null>(() => {
    const stored = localStorage.getItem('cliente_dando_la_vez');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as Cliente;
    } catch {
      return null;
    }
  });

  const fetchCliente = useCallback(async () => {
    if (perfil) {
      const response = await fetch(`http://localhost:8080/api/clientes/cliente/uid/${perfil.uid}`);
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setCliente(data.data);
          return;
        }
        throw new Error("Cliente no encontrado para el usuario autenticado");
      }
      throw new Error("Error al obtener cliente autenticado");
    }

    if (localCliente) {
      setCliente(localCliente);
      return;
    }

    throw new Error("No hay sesión de cliente activa");
  }, [perfil, localCliente]);

  const fetchPuesto = useCallback(async () => {
    const response = await fetch(`http://localhost:8080/api/puestos/puesto/${idPuesto}`);
    if (!response.ok) {
      throw new Error("Puesto no encontrado");
    }

    const data = await response.json();
    setPuesto(data.data);
  }, [idPuesto]);

  useEffect(() => {
    const loadData = async () => {
      if (!idPuesto) {
        setError("ID de puesto invalido");
        setLoading(false);
        return;
      }

      try {
        await fetchCliente();
        await fetchPuesto();
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Error al cargar datos del turno");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [idPuesto, fetchCliente, fetchPuesto]);

  const isSameCliente = (currentCliente: Cliente, otherCliente: Cliente) => String(currentCliente.id) === String(otherCliente.id);

  const pedirTurno = async () => {
    if (!puesto || !cliente) return;

    if (puesto.listaClientes.some((currentCliente) => isSameCliente(currentCliente, cliente))) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/clientes/nuevoTurno/${cliente.id}?idPuesto=${idPuesto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al pedir turno");
      } else {
        await fetchPuesto();
      }
    } catch (requestError) {
      console.error("Error pedir turno:", requestError);
      setError("Error al pedir turno");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!puesto || !cliente) return <div>No se pudo cargar la información</div>;

  const indiceCliente = puesto.listaClientes.findIndex((currentCliente) => isSameCliente(currentCliente, cliente));
  const numeroTurno = indiceCliente !== -1 ? indiceCliente + 1 : null;
  const clientesAntes = indiceCliente !== -1 ? puesto.listaClientes.slice(0, indiceCliente) : [];
  const clienteNombreMostrar = perfil?.nombre ?? cliente.nombre;

  return (
    <div className="mi-turno-container">
      {numeroTurno ? (
        <>
          <h1 className="mi-turno-title">Turno de {puesto.nombre}</h1>
          <div className="mi-turno-antes">
            <h2>Personas antes de ti</h2>
            {clientesAntes.length > 0 ? (
              <ul>
                {clientesAntes.map((currentCliente, index) => (
                  <li key={currentCliente.id}>{currentCliente.nombre}-{index + 1}</li>
                ))}
              </ul>
            ) : (
              <p>No hay nadie antes de ti.</p>
            )}
          </div>
          <div className="mi-turno-card">
            <div className="mi-turno-exito">
              ¡Ha entrado correctamente en el turno!<br />
              Aparecerá en la pantalla:
            </div>
            <div className="mi-turno-nombre-numero">
              {clienteNombreMostrar}-{numeroTurno}
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
