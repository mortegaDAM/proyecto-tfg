import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type AuthContextInterface, type UsuarioFirebase } from "../interfaces/interfaces";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";


const AuthContext = createContext<AuthContextInterface | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [perfil, setPerfil] = useState<UsuarioFirebase | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User|null>(null);

    const actualizarPerfil = (nuevoPerfil: UsuarioFirebase | null) => {
        setPerfil(nuevoPerfil);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("Dentro de useEffect");
            if (user) {
                try {
                    const respuesta = await fetch(`http://localhost:8080/api/usuarios/findUid/${auth.currentUser?.uid}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    const datos = await respuesta.json();
                    if (!datos.empty) {
                        setPerfil(datos.data);
                    }
                } catch (error) {
                    console.error(error);
                }
                setUser(user);
            } else {
                setPerfil(null);
                setUser(null);
            }

            setLoading(false);
        });
        return unsubscribe;
    },[]);

    return (
        <AuthContext.Provider value={{ user, perfil, loading, actualizarPerfil }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un <AuthProvider>");
    }
    return context;
}