import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const MisDatosView = () => {
    const { user, perfil, actualizarPerfil } = useAuth();
    const [nombre, setNombre] = useState(perfil?.nombre);
    const [estado, setEstado] = useState(false);
    const navigate = useNavigate();

    //console.log(perfil);

    const handleUpdateUser = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("handleUpdateUser -> peticion fetch");

        // updateEmail(user o auth.currentUser, emailNuevo)

        if (nombre === "") {
            alert("No pueden haber campos vacios");
        } else {

            if (user && perfil) {
                const usuarioEditado = {
                    "nombre": nombre,
                    "email": perfil.email,
                    "uid": user.uid
                }


                console.log("Actualizar los datos...")
                // TODO: hacer el update en server.ts
                // const respuesta = await fetch("http://localhost:3000/registro", {
                //     method: "POST",
                //     headers: {
                //         "Content-type": "application/json"
                //     },
                //     body: JSON.stringify(usuarioEditado)
                // });

                // if (respuesta.ok) {
                //     const datos = await respuesta.json();

                //     actualizarPerfil(datos.data);

                //     location.reload();
                // }
            }
        }
    }

    // envia un email de cambio de contraseña
    // un email muy feo
    // no controlas si se acaba la sesion
    const handlePassword = () => {
        // if (perfil) {
        //     sendPasswordResetEmail(auth, perfil.email)
        //         .then(() => console.log("Email enviado"))
        //         .catch(err => console.error(err));
        // }        
    }

    // TODO: modal para "Cancelar"

    return (
        <>
            <h1>Mis Datos</h1>
            {!estado ? (
                <div>
                    <ul>
                        <li>Nombre: {perfil?.nombre}</li>
                        <li>Email: {perfil?.email}</li>
                    </ul>
                    <button onClick={() => setEstado(true)}>Editar Datos</button>
                    <button onClick={handlePassword}>Actualizar Contraseña</button>
                </div>

            ) : (
                <div>
                    <form onSubmit={handleUpdateUser}>
                        <input type="text" value={nombre} placeholder={perfil?.nombre}
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                        />
                        {/*<input type="text" value={apellido} placeholder={perfil?.surname}
                            onChange={(event) => {
                                setApellido(event.target.value);
                            }}
                        />
                        <input type="text" value={username} placeholder={perfil?.username} required
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />*/}
                        <button type="submit">Actualizar Datos</button>
                        <button onClick={() => setEstado(false)}>Cancelar</button>
                    </form>
                </div>
            )}

        </>
    );
}