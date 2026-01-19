import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function Login() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    const handleLogIn = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pwd);
            console.log("Iniciado sesion correctamente");
            navigate('/');
        } catch (error) {
            console.error("No iniciado sesion " + error);
            alert("Email o Contraseña INCORRECTOS");
        }
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogIn}>
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
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
    );
}