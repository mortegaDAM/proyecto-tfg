import React, { useState } from "react";
import "./MiTurnoPuesto.css";

type Estado = "inicio" | "confirmado";

const MiTurnoPuesto: React.FC = () => {
  const [estado, setEstado] = useState<Estado>("inicio");
  const nombrePuesto = "Frutas María";
  const nombrePuestoConfirmado = "Frutas Sanz";
  const nombreUsuario = "Samuel";
  const numeroTurno = 17;

  return (
    <div className="mi-turno-container">
      {estado === "inicio" ? (
        <>
          <h1 className="mi-turno-title">Turno de {nombrePuesto}</h1>
          <button
            className="mi-turno-btn"
            onClick={() => setEstado("confirmado")}
          >
            Pedir turno
          </button>
        </>
      ) : (
        <>
          <h1 className="mi-turno-title">Turno de {nombrePuestoConfirmado}</h1>
          <div className="mi-turno-card">
            <div className="mi-turno-exito">
              ¡Ha entrado correctamente en el turno!<br />
              Aparecerá en la pantalla:
            </div>
            <div className="mi-turno-nombre-numero">
              {nombreUsuario} - {numeroTurno}
            </div>
            <div className="mi-turno-info">
              Se le informará de los cambios de la cola por el correo electrónico proporcionado
            </div>
          </div>
          <button
            className="mi-turno-btn"
            onClick={() => setEstado("inicio")}
          >
            Volver al Mercado
          </button>
        </>
      )}
    </div>
  );
};

export default MiTurnoPuesto;
