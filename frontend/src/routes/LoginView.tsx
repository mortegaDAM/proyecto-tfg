import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import '../styles/routes/LoginView.css';
import { useAuth } from "../hooks/AuthProvider";
import { useNotification } from "../hooks/NotificationContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (user) {
            navigate('/');
        }

    }, [user]);

    const handleLogIn = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pwd);
            console.log("Iniciado sesión en Firebase correctamente");
            //navigate('/');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            showNotification("Error de acceso", "Email o contraseña incorrectos. Reinténtalo.", "error");
        }
    }

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <form onSubmit={handleLogIn} className="login-form">
                        <input
                            type="email"
                            className="login-input"
                            value={email}
                            placeholder="Email"
                            required
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <input
                            type="password"
                            className="login-input"
                            value={pwd}
                            placeholder="Contraseña"
                            required
                            onChange={(event) => {
                                setPwd(event.target.value);
                            }}
                        />
                        <button type="submit" className="login-btn">
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="login-footer">
                        <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
                    </div>
                    <button className="back-btn" onClick={() => navigate('/')}>Volver a inicio</button>
                </div>
            </div>
        </div>
    );
}