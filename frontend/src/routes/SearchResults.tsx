import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Mercados } from "../interfaces/interfaces";
import Navbar from "../components/Navbar";

export const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');
    const [mercados, setMercados] = useState<Mercados[]>();

    useEffect(() => {

        const fetchData = async () => {
            if (query) {
                const respuesta = await fetch(`http://localhost:8080/api/mercados/buscar?name=${query}`);
                if (respuesta.ok) {
                    const datos = await respuesta.json();
                    setMercados(datos.data);
                }
            }
        }

        fetchData();

    }, [query]);



    return (
        <>
            <h1>Resultados de "{query}"</h1>
            {mercados?.length == 0 || !mercados ? (
                <p>No se encuentran coincidencias con la búsqueda</p>
            ) : (
                mercados.map((mercado: Mercados) => (
                    <div className="mercados" key={mercado.id}>
                        <h2>{mercado.nombre}</h2>
                    </div>
                ))
            )}
        </>
    );
}