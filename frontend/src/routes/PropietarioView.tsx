import { useNavigate } from "react-router-dom"
import type { Puesto } from "../interfaces/interfaces"

export const PropietarioView = (puesto: Puesto) => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Vista Propietario del puesto {puesto.nombre}</h1>
            <button onClick={() => navigate(-1)}>Volver atrás...</button>
        </>
    )
}