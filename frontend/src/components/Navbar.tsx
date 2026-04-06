import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import '../styles/components/Navbar.css';
import miLogo from '../assets/logotipo.jpg';

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
                {/*<div className="navbar-logo" aria-label="DLV">
                <span className="logo-letter logo-d">D</span>
                <span className="logo-letter logo-l">L</span>
                <span className="logo-letter logo-v">V</span>
            </div>
            <h1 className="navbar-title">Dando La Vez</h1>*/}
                <img src={miLogo} alt="Logotipo" height={70} />
            </div>

            <div className="navbar-center">
                <div className="search-container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="search-input-wrapper">
                            <input
                                type="text"
                                placeholder="Buscar mercados..."
                                className="search-input"
                                onChange={(e) => {
                                    setValor(e.target.value);
                                }}
                            />
                            <button type="submit" className="search-button">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="navbar-actions">
                {user ? (
                    <button
                        className="navbar-profile-btn"
                        onClick={() => navigate('/mi-cuenta')}
                        aria-label="Perfil"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="navbar-account-text">Mi Cuenta</span>
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
