import type { User } from "firebase/auth"

export interface UsuarioFirebase {
    id: number,
    nombre: string,
    email: string,
    uid: string
}

// export interface OutletContext {
//     user: User,
//     perfil: UsuarioFirebase,
//     loading: boolean,
//     actualizarPerfil(perfil: UsuarioFirebase): void
// }

export interface AuthContextInterface {
    user: User | null,
    perfil: UsuarioFirebase | null,
    loading: boolean,
    actualizarPerfil(perfil: UsuarioFirebase): void
}

export interface Mercados {
    id: number,
    nombre: string
}