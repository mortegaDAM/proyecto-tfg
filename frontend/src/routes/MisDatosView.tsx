import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import React from 'react';
import '../styles/routes/MisDatosView.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ModalView } from "../components/Modal";
import { useNotification } from "../hooks/NotificationContext";

export const MisDatosView = () => {
    const { user, perfil, actualizarPerfil } = useAuth();
    const [nombre, setNombre] = useState(perfil?.nombre);
    const [estado, setEstado] = useState(false);
    const { showNotification } = useNotification();

    // Datos modal
    const [abrirModal, setAbrirModal] = useState(false);
    const [tituloModal, setTituloModal] = useState("");
    const [mensajeModal, setMensajeModal] = useState("");
    const [condicionalModal, setCondicionalModal] = useState(false);

    //console.log(perfil);

    const handleUpdateUser = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!nombre || nombre.trim() === "") {
            showNotification("Campo requerido", "El nombre no puede estar vacío.", "error");
            return;
        }

        if (user && perfil) {
            try {
                const usuarioEditado = {
                    ...perfil,
                    "nombre": nombre
                }

                const respuesta = await fetch(`http://localhost:8080/api/usuarios/update/${perfil.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(usuarioEditado)
                });

                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    actualizarPerfil(datos.data);

                    // llamada al modal
                    handleUsuarioActualizado();

                    setEstado(false);
                } else {
                    showNotification("Error", "Error al actualizar los datos en el servidor.", "error");
                }
            } catch (error) {
                console.error("Error updating user:", error);
                showNotification("Error de conexión", "No se pudieron actualizar los datos.", "error");
            }
        }
    }

    // envia un email de cambio de contraseña
    // un email muy feo
    // no controlas si se acaba la sesion
    const handlePassword = () => {
        if (perfil?.email) {
            sendPasswordResetEmail(auth, perfil.email)
                .then(() => {
                    showNotification("Email enviado", "Se ha enviado un correo a " + perfil.email + " para restablecer tu contraseña.", "success");
                })
                .catch(err => {
                    console.error("Error al enviar email de restablecimiento:", err);
                    showNotification("Error", "No se pudo enviar el correo de restablecimiento.", "error");
                });
        } else {
            showNotification("Sin email", "No se encontró un email asociado a tu cuenta.", "error");
        }
    }

    const handleCancelarActualizacion = () => {
        setAbrirModal(true);
        setTituloModal("Cancelar");
        setMensajeModal("¿Estás seguro de querer cancelar la operación?");
        // opcion de aceptar y cancelar modal
        setCondicionalModal(true);
    }

    const handleUsuarioActualizado = () => {
        showNotification("Usuario actualizado", "Tus datos se han guardado correctamente.", "success");
    }

    return (
        <div className="page-wrapper">
            {/* Navbar handles itself usually, or this is inside Outlet */}
            <div className="data-container">
                <div className="data-card">
                    <h1 className="data-title">Mis Datos</h1>

                    {!estado ? (
                        <div>
                            <ul className="data-list">
                                <li><strong>Nombre:</strong> {perfil?.nombre}</li>
                                <li><strong>Email:</strong> {perfil?.email}</li>
                            </ul>
                            <div className="data-actions">
                                <button className="data-btn primary" onClick={() => setEstado(true)}>Editar Datos</button>
                            </div>
                            <button className="data-btn secondary password-btn" onClick={handlePassword}>Actualizar Contraseña</button>
                        </div>

                    ) : (
                        <div>
                            <form onSubmit={handleUpdateUser} className="data-form">
                                <input
                                    type="text"
                                    className="data-input"
                                    value={nombre}
                                    placeholder={perfil?.nombre}
                                    onChange={(event) => {
                                        setNombre(event.target.value);
                                    }}
                                />
                                {/*<input type="text" value={apellido} placeholder={perfil?.surname}
                                    onChange={(event) => {
                                        setApellido(event.target.value);
                                    }}
                                />
                                <input type="text" value={username} placeholder={perfil?.username} required
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                />*/}
                                <div className="data-actions">
                                    <button type="submit" className="data-btn primary">Actualizar Datos</button>
                                    <button type="button" className="data-btn secondary" onClick={handleCancelarActualizacion}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <ModalView
                abierto={abrirModal}
                titulo={tituloModal}
                mensaje={mensajeModal}
                cancelar={() => setAbrirModal(false)}
                aceptar={() => { setAbrirModal(false); setEstado(false); }}
                condicional={condicionalModal} />
        </div>
    );
}