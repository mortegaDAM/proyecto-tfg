import { deleteUser, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export const MiCuentaView = () => {
    const navigate = useNavigate();
    const { perfil, user } = useAuth();

    // Cerrar sesion
    const handleCloseSession = async () => {
        await signOut(auth)
            .then(() => {
                alert("Se ha cerrado sesion correctamente");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert("Error al cerrar sesion");
            });
    }

    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        try {
            if (user && perfil) {
                // TODO comprobar si se elimina bien antes de borrar en firebase
                const respuesta = await fetch(`http://localhost:8080/api/usuarios/delete/${perfil.id}`, {
                    method: "DELETE"
                });

                if (respuesta.ok) {
                    await deleteUser(user)
                        .then(() => {
                            console.log("usuario borrado");
                            alert("Usuario borrado correctamente");
                            navigate(`/`);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        } catch (err) {
            console.error(err);
            alert("No se ha podido borrar el usuario");

        }
    }

    return (
        <>
            <h1>Mi Cuenta</h1>
            <h2>{perfil?.nombre}</h2>
            <button onClick={() => navigate(`/mi-cuenta/datos`)}>Mis Datos</button>
            <button onClick={() => navigate(`/mi-cuenta/puestos`)}>Mis Puestos</button>
            <button onClick={handleCloseSession}>Cerrar Sesion</button>
            <button onClick={handleDeleteAccount}>Borrar Cuenta</button>
        </>
    );
}