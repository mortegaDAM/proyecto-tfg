
import { useEffect, useState } from "react";
import type { Mercados } from "../interfaces/interfaces";
import { Link, useOutletContext } from "react-router-dom";

// Interface for Mock Data (Visuals)
interface MarketMock {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    rating: number;
    isOpen: boolean;
}

const MOCK_MARKETS: MarketMock[] = [
    {
        id: 1,
        name: "Mercado de San Miguel",
        category: "Gastronomía",
        description: "Histórico mercado con puestos de comida gourmet y tapas variadas en un ambiente animado.",
        image: "https://placehold.co/600x400/e67e22/ffffff?text=San+Miguel",
        rating: 4.8,
        isOpen: true
    },
    {
        id: 2,
        name: "Mercado de la Paz",
        category: "Alimentación",
        description: "Mercado tradicional de barrio con productos frescos de alta calidad y trato cercano.",
        image: "https://placehold.co/600x400/27ae60/ffffff?text=Mercado+Paz",
        rating: 4.6,
        isOpen: true
    },
    {
        id: 3,
        name: "Mercado de Maravillas",
        category: "Variedad",
        description: "El mercado municipal más grande de Europa, con cientos de puestos de todo tipo.",
        image: "https://placehold.co/600x400/2980b9/ffffff?text=Maravillas",
        rating: 4.5,
        isOpen: false
    },
    {
        id: 4,
        name: "Mercado de Motores",
        category: "Vintage",
        description: "Mercadillo mensual de artesanía, diseño, vintage y comida en un museo de ferrocarril.",
        image: "https://placehold.co/600x400/8e44ad/ffffff?text=Motores",
        rating: 4.7,
        isOpen: false
    },
    {
        id: 5,
        name: "Mercado de Antón Martín",
        category: "Gastronomía",
        description: "Fusión de mercado tradicional con propuestas gastronómicas modernas e internacionales.",
        image: "https://placehold.co/600x400/c0392b/ffffff?text=Anton+Martin",
        rating: 4.4,
        isOpen: true
    },
    {
        id: 6,
        name: "Mercado de Vallehermoso",
        category: "Ecológico",
        description: "Mercado de abastos con una fuerte apuesta por el producto de proximidad y ecológico.",
        image: "https://placehold.co/600x400/16a085/ffffff?text=Vallehermoso",
        rating: 4.9,
        isOpen: true
    }
];

export const HomeView = () => {
    // Logic from backend (preserved as requested)
    const [mercados, setMercados] = useState<Mercados[]>();

    // Access context from MenuView Layout if needed (e.g. for opening login modal)
    // const { setIsLoginModalOpen } = useOutletContext<any>(); 
    // For now we can use a local state or just console log click
    const handleMarketClick = () => {
        console.log("Market clicked - Logic to open details or Login Modal");
        // setIsLoginModalOpen(true); 
    };

    useEffect(() => {
        console.log("USE EFFECT HOME");
        const getMercados = async () => {
            try {
                const respuesta = await fetch("http://localhost:8080/api/Mercado/getAll");
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMercados(datos.data);
                    console.log("Mercados fetched:", datos.data);
                }
            } catch (e) {
                console.error("Error fetching markets", e);
            }
        }
        getMercados();
    }, []);


    return (
        <>
            <header className="section-header">
                <h2 className="section-title">Descubre tus mercados locales</h2>
                <p className="section-subtitle">Explora los mejores puestos y productos cerca de ti. Si quieres añadir un puesto a algún mercado, no dudes en registrarte.</p>
            </header>

            {/* 
                Visual Update: Using MOCK_MARKETS to show the design. 
                Existing 'mercados' state is fetched but not currently used for display 
                because the backend data structure is incomplete/empty.
            */}
            <div className="markets-grid">
                {MOCK_MARKETS.map((market) => (
                    <div key={market.id} className="market-card" onClick={handleMarketClick}>
                        <div className="card-image-container">
                            <img src={market.image} alt={market.name} className="card-image" />
                        </div>

                        <div className="card-content">
                            <span className="market-category">{market.category}</span>
                            <h3 className="market-title">{market.name}</h3>
                            <p className="market-description">{market.description}</p>

                            <div className="card-footer">
                                <div className="rating">
                                    <span className="star-icon">★</span>
                                    <span>{market.rating}</span>
                                </div>
                                <span className={`status-badge ${!market.isOpen ? 'closed' : ''}`}>
                                    {market.isOpen ? 'Abierto' : 'Cerrado'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 
            <section>
                <h1>Los Últimos Mercados (Backend Data)</h1>
                {!mercados ? (
                    <h2>Error al cargar los mercados o lista vacía</h2>
                ) : (
                    mercados.map((mercado: Mercados) => (
                        <div className="mercados" key={mercado.id}>
                            <h2>{mercado.nombre}</h2>
                        </div>
                    ))
                )}
            </section>
            */}
        </>
    );
}