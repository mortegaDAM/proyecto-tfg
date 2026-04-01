import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type AuthContextInterface, type Usuario } from "../interfaces/interfaces";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";


const AuthContext = createContext<AuthContextInterface | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [perfil, setPerfil] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const actualizarPerfil = (nuevoPerfil: Usuario | null) => {
        setPerfil(nuevoPerfil);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("onAuthStateChanged:", currentUser?.email);
            if (currentUser) {
                setUser(currentUser);
                try {
                    const respuesta = await fetch(`http://localhost:8080/api/usuarios/findUid/${currentUser.uid}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    if (respuesta.ok) {
                        const datos = await respuesta.json();
                        if (datos.data) {
                            setPerfil(datos.data);
                        } else {
                            console.warn("User authenticated in Firebase but not found in backend DB");
                            setPerfil(null);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            } else {
                setPerfil(null);
                setUser(null);
            }

            setLoading(false);
        });
        return unsubscribe;
    }, []);

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