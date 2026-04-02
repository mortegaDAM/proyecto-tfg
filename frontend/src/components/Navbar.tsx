import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import '../styles/components/Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [valor, setValor] = useState('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        navigate(`/buscar?search=${encodeURIComponent(valor)}`);
    }


    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="navbar-logo" aria-label="DLV">
                <span className="logo-letter logo-d">D</span>
                <span className="logo-letter logo-l">L</span>
                <span className="logo-letter logo-v">V</span>
            </div>
            <h1 className="navbar-title">Dando La Vez</h1>
        </div>

            <div className="navbar-center">
                <div className="search-container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar mercados..."
                            className="search-input"
                            onChange={(e) => {
                                setValor(e.target.value);
                            }}
                        />
                        <button type="submit" className="search-button">Buscar</button>
                    </form>

                </div>
            </div>

            <div className="navbar-actions">
                {user ? (
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/mi-cuenta')}
                    >
                        <span>🏪</span> Mi Cuenta
                    </button>
                ) : (
                    <>
                        {location.pathname !== '/login' && (
                            <button
                                className="btn-secondary"
                                onClick={() => navigate('/login')}
                            >
                                Iniciar Sesión
                            </button>
                        )}
                        {location.pathname !== '/registro' && (
                            <button
                                className="btn-primary"
                                onClick={() => navigate('/registro')}
                            >
                                Registrarse
                            </button>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
