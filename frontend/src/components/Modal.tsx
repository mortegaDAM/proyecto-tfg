import { type Modal } from '../interfaces/interfaces'

// Paso las props
export const ModalView = ({ abierto, titulo, mensaje, cancelar, aceptar, condicional }: Modal) => {

    if (!abierto) {
        return null;
    }

    if (!condicional) {
        return (
            <>
                <div className='fondo-modal'>
                    <h2>{titulo}</h2>
                    <p>{mensaje}</p>
                    <button onClick={cancelar}>Cerrar</button>
                </div>

            </>

        )
    }

    return (
        <>
            <div className="capa-oscura" onClick={cancelar}></div>
            <div className='fondo-modal'>
                <h2>{titulo}</h2>
                <p>{mensaje}</p>
                <div className='botones-modal'>
                    <button onClick={cancelar}>Cancelar</button>
                    <button onClick={aceptar}>Aceptar</button>
                </div>

            </div>
        </>
    );
} 