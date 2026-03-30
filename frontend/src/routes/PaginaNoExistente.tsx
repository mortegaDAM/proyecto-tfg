import { Link } from "react-router-dom"

export const PaginaNoExistente = () => {
    return (
        <>
            <h1>Página no Existente</h1>
            <Link to={"/"}>Volver a Inicio</Link>
        </>
    )
}