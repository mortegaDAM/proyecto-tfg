import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export interface UsuarioFirebase {
    name: string,
    surname: string,
    username: string,
    email: string
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [perfil, setPerfil] = useState<UsuarioFirebase | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const autenticado = onAuthStateChanged(auth, async (user) => {

            if (user) {
                try {
                    const respuesta = await fetch("http://localhost:3000/get-user", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: user.uid
                    });
                    const datos = await respuesta.json();
                    if (!datos.empty) {
                        setPerfil(datos.usuario);
                    }
                    setUser(user);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                }
            } else {
                setLoading(false);
                setPerfil(null);
                setUser(null);
            }
        });
        return autenticado;
    }, []);

    return { user, perfil, loading };
}