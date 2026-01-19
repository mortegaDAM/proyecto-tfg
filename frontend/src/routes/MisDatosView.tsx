import { useOutletContext } from "react-router-dom";
import { type OutletContext } from "./MiCuentaView";
import { useState } from "react";

export const MisDatosView = () => {
    const { perfil } = useOutletContext<OutletContext>();
    const [nombre, setNombre] = useState(perfil.name);
    const [apellido, setApellido] = useState(perfil.surname);
    const [username, setUsername] = useState(perfil.username);
    const [estado, setEstado] = useState(false);

    const handleUpdateUser = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("handleUpdateUser -> peticion fetch");

        if (nombre === "" || apellido === "" || username === "") {
            alert("No pueden haber campos vacios");
        } else {
            console.log("ACtualizar los datos...")
            // TODO: hacer el update en server.ts
            // const respuesta = await fetch("http://localhost:3000/actualizar-usuario", {
            //     method: "POST",
            //     headers: {
            //         "Content-type": "application/json"
            //     },
            //     body: JSON.stringify(perfil)
            // });

            // TODO: actualizar perfil con los datos actualizados de firebase
            location.reload();
        }


    }

    // TODO: modal para "Cancelar"

    return (
        <>
            <h1>Mis Datos</h1>
            {!estado ? (
                <div>
                    <ul>
                        <li>Nombre: {perfil.name}</li>
                        <li>Apellido: {perfil.surname}</li>
                        <li>Nombre de Usuario: {perfil.username}</li>
                        <li>Email: {perfil.email}</li>
                    </ul>
                    <button onClick={() => setEstado(true)}>Editar Datos</button>
                </div>

            ) : (
                <div>
                    <form onSubmit={handleUpdateUser}>
                        <input type="text" value={nombre} placeholder={perfil.name}
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                        />
                        <input type="text" value={apellido} placeholder={perfil.surname}
                            onChange={(event) => {
                                setApellido(event.target.value);
                            }}
                        />
                        <input type="text" value={username} placeholder={perfil.username} required
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <button type="submit">Actualizar Datos</button>
                        <button onClick={() => setEstado(false)}>Cancelar</button>
                    </form>
                </div>
            )}

        </>
    );
}