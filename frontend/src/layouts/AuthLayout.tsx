import { Outlet } from "react-router-dom";

// Poner los estilos para registro y login
export const AuthLayout = () =>{
    return(
        <>
            {/* llama a registro o a login */}
            <Outlet/>
        </>
    );
}