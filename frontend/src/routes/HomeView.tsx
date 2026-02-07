
import { useEffect, useState } from "react";
import type { Mercados } from "../interfaces/interfaces";
import { Link } from "react-router-dom";


/*
    Se necesita:
    - llamar a API -> sacar mercados -> cuantos?
    - almacenarlo en un array
    - mostrar cada mercado en un array.map()
    - necesitamos fotos?
    - necesitamos props para cada mercado cuando se haga click? -> id?
    - comprobar cuando se haga click si user existe (mercadoView)
*/

export const HomeView = () => {
    const [mercados, setMercados] = useState<Mercados[]>();

    useEffect(() => {
        console.log("USE EFFECT HOME");
        const getMercados = async () => {
            const respuesta = await fetch("http://localhost:8080/api/Mercado/getAll");
            if (respuesta.ok) {
                const datos = await respuesta.json();

                setMercados(datos.data);
                console.log(mercados);
            }
        }
        getMercados();
    }, []);


    return (
        <>
            <h1>Los Últimos Mercados</h1>
            <section>
                {!mercados ? (
                    <h2>Error al cargar los mercados</h2>
                ) : (
                    mercados.map((mercado: Mercados) => (
                        <div className="mercados" key={mercado.id}>
                            <h2>{mercado.nombre}</h2>
                            {/*<Link to="mercado"></Link>*/}
                        </div>
                    ))
                )}
            </section>

        </>
    );
}