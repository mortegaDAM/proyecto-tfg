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

export interface Mercados {
    id: number,
    nombre: string
}

export interface Clientes {
    id: number,
    email: string,
    nombre: string
}

export interface Puesto {
    id: number,
    nombre: string,
    listaClientes: Clientes[]
}