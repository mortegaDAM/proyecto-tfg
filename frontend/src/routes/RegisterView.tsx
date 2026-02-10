import { createUserWithEmailAndPassword, } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


export const RegisterView = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    // const [surname, setSurname] = useState('');

    // Si el username ya existe - NO EN BBDD
    // const handleUserName = async () => {
    //     try {
    //         const respuesta = await fetch(`http://localhost:3000/get-equal-username?username=${username.toLowerCase().trim()}`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //         });

    //         const datos = await respuesta.json();
    //         return datos.existe;

    //     } catch (error) {
    //         console.error(error);
    //         alert("Error de conexion");
    //         return true;
    //     }
    // }

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            //const existe = await handleUserName();
            const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);


            const usuarioNuevo = {
                "nombre": name,
                "email": email,
                "uid": userCredential.user.uid
            }

            const respuesta = await fetch("http://localhost:8080/api/usuarios/create", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(usuarioNuevo)
            });


            if (respuesta.ok) {
                const datos = await respuesta.json();
                console.log(datos);

                alert('Usuario Registrado Correctamente');
                navigate('/');

            } else {
                alert('No se ha podido registrar el usuario');
            }

        } catch (error) {
            alert("Email ya registrado anteriormente");
            console.error("Registro Error: " + error);
        }
    }

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <input type="text" value={name} placeholder="Nombre" required
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                {/*<input type="text" value={surname} placeholder="Apellido" required
                    onChange={(event) => {
                        setSurname(event.target.value);
                    }}
                />
                <input type="text" value={username} placeholder="Username" required
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />*/}
                <input type="email" value={email} placeholder="Email" required
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <input type="password" value={pwd} placeholder="Contraseña" required
                    onChange={(event) => {
                        setPwd(event.target.value);
                    }}
                />
                <button type="submit">Registrarse</button>
            </form>
            <button onClick={() => navigate('/')}>Volver a inicio</button>

        </div>
    );
}