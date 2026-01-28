import { Link } from "react-router-dom"

export const PaginaNoExistente = () => {
    return (
        <>
            <h1>ERROR</h1>
            <Link to={"/"}>Volver a Inicio</Link>
        </>
    )
}