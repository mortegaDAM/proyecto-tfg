import type { User } from "firebase/auth"

export interface Usuario {
    id: number,
    nombre: string,
    email: string,
    uid: string
}

export interface AuthContextInterface {
    user: User | null,
    perfil: Usuario | null,
    loading: boolean,
    actualizarPerfil(perfil: Usuario): void
}

export interface Mercado {
    id: number,
    nombre: string,
    descripcion: string
}

// Interface for Mock Data (Visuals)
export interface MarketMock {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    isOpen: boolean;
}

export interface Cliente {
    id: number,
    email: string,
    nombre: string
}

export interface Puesto {
    id: number,
    nombre: string,
    listaClientes: Cliente[],
    abierto?: boolean
}

export interface Modal {
    abierto: boolean,
    titulo: string,
    mensaje: string,
    cancelar: () => void,
    aceptar: () => void,
    condicional: boolean,
    tipo?: 'success' | 'error' | 'info'
}

export interface NotificationContextInterface {
    showNotification: (titulo: string, mensaje: string, tipo?: 'success' | 'error' | 'info', persistente?: boolean) => void;
    hideNotification: () => void;
}

