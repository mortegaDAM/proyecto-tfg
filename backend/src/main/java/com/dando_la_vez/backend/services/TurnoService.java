package com.dando_la_vez.backend.services;

import org.springframework.stereotype.Service;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.model.Puesto;

@Service
public class TurnoService {
    // Buscar puesto cliente
    public long numeroCliente(Puesto puesto, Cliente cliente) {
        return puesto.getListaClientes().indexOf(cliente) + 1;
    }

    // Comprobar turno con puesto
    public Boolean comprobarTurno(Puesto puesto, Cliente cliente) {
        long actual = puesto.getNumeroActual();
        int indiceCliente = puesto.getListaClientes().indexOf(cliente);
        return actual == (indiceCliente + 1);
    }

    //Comprovar turno para avisar varios turnos antes

    /// Aplazar turno: Mover al cliente x posiciones hacia atrás
    public boolean aplazarTurno(Puesto puesto, Cliente cliente, long numeroTurnos) {
        int indiceActual = puesto.getListaClientes().indexOf(cliente);
        if (indiceActual == -1) {
            return false;
        }

        puesto.getListaClientes().remove(indiceActual);

        int desplazamiento = (int) numeroTurnos;

        int nuevaPosicion = Math.min(indiceActual + desplazamiento, puesto.getListaClientes().size());
        puesto.getListaClientes().add(nuevaPosicion, cliente);

        return true;
    }

    // eliminar turno
    public boolean cancelarTurno(Puesto puesto, Cliente cliente) {

        boolean eliminado = puesto.getListaClientes().remove(cliente);
        if (eliminado) {
            return true;
        }
        return false;
    }
}
