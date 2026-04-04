import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import '../styles/hooks/AuthStatus.css';

export const AuthStatus = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="auth-loading">
                <div className="auth-loading-content">
                    <div className="auth-spinner">
                        <div className="auth-spinner-ring" />
                    </div>
                    <h2 className="auth-loading-title">Dando La Vez</h2>
                    <p className="auth-loading-text">Preparando todo para ti...</p>
                </div>
            </div>
        );
    }

    return (
        <Outlet />
    );
}