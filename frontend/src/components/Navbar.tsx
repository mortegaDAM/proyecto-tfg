import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import './Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-title" onClick={() => navigate('/')}>Dando La Vez</h1>
            </div>

            <div className="navbar-center">
                <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar mercados..."
                        className="search-input"
                    />
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
