
// Interface for Mock Data (Visuals)
interface MarketMock {
    id: number;
    name: string;
    description: string;
    image: string;
}

const MOCK_MARKETS: MarketMock[] = [
    {
        id: 1,
        name: "Mercado de San Miguel",
        description: "Histórico mercado con puestos de comida gourmet y tapas variadas en un ambiente animado.",
        image: "https://placehold.co/600x400/e67e22/ffffff?text=San+Miguel",
    },
    {
        id: 2,
        name: "Mercado de la Paz",
        description: "Mercado tradicional de barrio con productos frescos de alta calidad y trato cercano.",
        image: "https://placehold.co/600x400/27ae60/ffffff?text=Mercado+Paz",
    },
    {
        id: 3,
        name: "Mercado de Maravillas",
        description: "El mercado municipal más grande de Europa, con cientos de puestos de todo tipo.",
        image: "https://placehold.co/600x400/2980b9/ffffff?text=Maravillas",
    },
    {
        id: 4,
        name: "Mercado de Motores",
        description: "Mercadillo mensual de artesanía, diseño, vintage y comida en un museo de ferrocarril.",
        image: "https://placehold.co/600x400/8e44ad/ffffff?text=Motores",
    },
    {
        id: 5,
        name: "Mercado de Antón Martín",
        description: "Fusión de mercado tradicional con propuestas gastronómicas modernas e internacionales.",
        image: "https://placehold.co/600x400/c0392b/ffffff?text=Anton+Martin",
    },
    {
        id: 6,
        name: "Mercado de Vallehermoso",
        description: "Mercado de abastos con una fuerte apuesta por el producto de proximidad y ecológico.",
        image: "https://placehold.co/600x400/16a085/ffffff?text=Vallehermoso",
    }
];

export const HomeView = () => {
    // Logic from backend (preserved as requested)
    // const [mercados, setMercados] = useState<Mercados[]>();

    // Access context from MenuView Layout if needed (e.g. for opening login modal)
    // const { setIsLoginModalOpen } = useOutletContext<any>(); 
    // For now we can use a local state or just console log click
    const handleMarketClick = () => {
        console.log("Market clicked - Logic to open details or Login Modal");
        // setIsLoginModalOpen(true); 
    };


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
                            <h3 className="market-title">{market.name}</h3>
                            <p className="market-description">{market.description}</p>
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