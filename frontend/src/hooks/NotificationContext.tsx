import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import { type NotificationContextInterface } from "../interfaces/interfaces";
import { ModalView } from "../components/Modal";

const NotificationContext = createContext<NotificationContextInterface | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [abierto, setAbierto] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [tipo, setTipo] = useState<'success' | 'error' | 'info'>('info');
    const [persistente, setPersistente] = useState(false);

    const showNotification = (t: string, m: string, tp: 'success' | 'error' | 'info' = 'info', p: boolean = false) => {
        setTitulo(t);
        setMensaje(m);
        setTipo(tp);
        setPersistente(p);
        setAbierto(true);
    };

    const hideNotification = () => setAbierto(false);

    // Auto-dismiss logic for non-persistent toasts
    useEffect(() => {
        if (abierto && !persistente) {
            const timer = setTimeout(() => {
                setAbierto(false);
            }, 5000); // 5 seconds
            return () => clearTimeout(timer);
        }
    }, [abierto, persistente]);

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            {/* The actual toast rendered globally */}
            <ModalView
                abierto={abierto}
                titulo={titulo}
                mensaje={mensaje}
                cancelar={hideNotification}
                aceptar={hideNotification}
                condicional={false}
                tipo={tipo}
            />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification debe ser usado dentro de un <NotificationProvider>");
    }
    return context;
};
