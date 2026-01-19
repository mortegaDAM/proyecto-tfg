import { db } from "./firebase";

// METODOS PARA LA COLECCION USUARIOS

// no implementado
export const registerNewUser = async (
    emailUser: string,
    usernameUser: string,
    nameUser: string,
    surnameUser: string,
    uidUser: string
) => {
    try {
        const docRef = db.collection("usuarios").doc(uidUser).set({
            name: nameUser,
            surname: surnameUser,
            username: usernameUser,
            email: emailUser
        })
            .then(() => {
                console.log("Document successfully written!");
            })
    } catch (error) {
        console.error("Registro Firestore: " + error);
    }


}
