import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import './RegisterView.css';



export const RegisterView = () => {
    const navigate = useNavigate();
    const { actualizarPerfil } = useAuth();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);

            // Actualizar el perfil en Firebase (displayName)
            await updateProfile(userCredential.user, {
                displayName: name
            });

            const usuarioNuevo = {
                "nombre": name,
                "email": email,
                "uid": userCredential.user.uid,
                "tipo": "PUESTO"
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

                // Actualizamos el estado global para evitar la carrera entre Firebase y DB
                actualizarPerfil(datos.data);

                alert('Usuario Registrado Correctamente');
                navigate('/');

            } else {
                alert('No se ha podido registrar el usuario en la base de datos');
            }


        } catch (error) {
            alert("Error en el registro: " + error);
            console.error("Registro Error: ", error);
        }
    }

    return (
        <div className="page-wrapper">
            {/* Reuse Navbar if needed, or just keep it standalone page. 
                 User request implies a separate view, but keeping consistency. 
                 Since it's a separate route /registro, adding Navbar might be good or bad depending on design.
                 Given the design of MenuView, let's keep it simple and just show the form centered.
             */}
            <Navbar />
            <div className="register-container">
                <div className="register-card">
                    <h1 className="register-title">Registrarse</h1>
                    <form onSubmit={handleRegister} className="register-form">
                        <input
                            type="text"
                            className="register-input"
                            value={name}
                            placeholder="Nombre"
                            required
                            onChange={(event) => setName(event.target.value)}
                        />

                        <input
                            type="email"
                            className="register-input"
                            value={email}
                            placeholder="Email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <input
                            type="password"
                            className="register-input"
                            value={pwd}
                            placeholder="Contraseña"
                            required
                            onChange={(event) => setPwd(event.target.value)}
                        />

                        <button type="submit" className="register-btn">
                            Registrarse
                        </button>
                    </form>
                    <button className="back-btn" onClick={() => navigate('/')}>Volver a inicio</button>

                </div>
            </div>
        </div>
    );
}