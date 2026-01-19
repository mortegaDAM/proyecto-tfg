import { Link } from "react-router-dom"

export const PaginaNoExistente = () =>{
    return(
        <>
            <h1>ERROR 404</h1>
            <Link to={"/"}>Volver a Inicio</Link>
        </>
    )
}