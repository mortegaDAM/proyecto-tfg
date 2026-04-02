import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Navbar from '../components/Navbar';
import LoginModal from "../components/LoginModal";
import '../styles/routes/MenuView.css';

export const MenuView = () => {
    const { user } = useAuth(); // If we need to check auth logic later
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <div className="home-container">
            <Navbar />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            <main className="main-content">
                {/* Render nested routes below the main content */}
                <Outlet context={{ setIsLoginModalOpen }} />
            </main>
        </div>
    );
}
