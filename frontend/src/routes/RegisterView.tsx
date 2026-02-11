import { createUserWithEmailAndPassword, } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './RegisterView.css';


export const RegisterView = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    // Using 'name' state for "Usuario" field as per current backend logic mapping
    const [name, setName] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);

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
        <div className="page-wrapper">
            {/* Reuse Navbar if needed, or just keep it standalone page. 
                 User request implies a separate view, but keeping consistency. 
                 Since it's a separate route /registro, adding Navbar might be good or bad depending on design.
                 Given the design of MenuView, let's keep it simple and just show the form centered.
             */}
            <Navbar />
            <div className="register-container">
                <div className="register-card">
                    <h1 className="register-title">Registrar Puesto</h1>
                    <form onSubmit={handleRegister} className="register-form">
                        <input
                            type="text"
                            className="register-input"
                            value={name}
                            placeholder="Nombre del Puesto"
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
            <button onClick={() => navigate('/')}>Volver a inicio</button>

                </div>
            </div>
        </div>
    );
}