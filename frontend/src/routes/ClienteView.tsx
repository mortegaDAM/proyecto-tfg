import { useNavigate } from "react-router-dom";

export const ClienteView = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Puesto vista cliente</h1>
            <button onClick={() => navigate(-1)}>Volver atrás...</button>
        </>
    );
}