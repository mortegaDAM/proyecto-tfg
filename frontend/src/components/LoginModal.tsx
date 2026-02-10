import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import './LoginModal.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogIn = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pwd);
            console.log("Iniciado sesion correctamente");

            // If remember me is implemented, we would persist state here or use setPersistence from firebase
            // For visual purposes, we just have the state

            onClose(); // Close modal on success
            navigate('/mi-cuenta'); // Optional: redirect to dashboard or keep on page
        } catch (error) {
            console.error("No iniciado sesion " + error);
            alert("Email o Contraseña INCORRECTOS");
        }
    }

    // Stop propagation when clicking inside modal to avoid closing when clicking content
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick}>
                <button className="close-button" onClick={onClose}>×</button>

                <h2 className="modal-title">Iniciar Sesión</h2>

                <form onSubmit={handleLogIn} className="login-form">
                    <input
                        type="email"
                        className="login-input"
                        value={email}
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="login-input"
                        value={pwd}
                        placeholder="Contraseña"
                        required
                        onChange={(e) => setPwd(e.target.value)}
                    />

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">Recuérdame</label>
                    </div>

                    <button type="submit" className="login-btn">
                        Entrar
                    </button>
                </form>

                <div className="modal-footer">
                    <p>
                        ¿No tienes cuenta? <Link to="/registro" className="register-link" onClick={onClose}>Regístrate aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
