package com.dando_la_vez.backend.services;


import org.hibernate.mapping.List;
import org.springframework.stereotype.Service;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.model.Puesto;

@Service
public class TurnoService {
    //Buscar puesto cliente
    public long numeroCliente(Puesto puesto, Cliente cliente){

        long puestoCliente= puesto.getListaClientes().indexOf(cliente) + 1;
        return puestoCliente;
    }
    //Comprobar turno con puesto
    public Boolean comprobarTurno(Puesto puesto, Cliente cliente) {
    long actual = puesto.getNumeroActual();
    int indiceCliente = puesto.getListaClientes().indexOf(cliente);
    return actual == (indiceCliente + 1);
}

    /// Aplazar turno: Mover al cliente x posiciones hacia atrás
    public boolean aplazarTurno(Puesto puesto, Cliente cliente) {
       int indiceActual = puesto.getListaClientes().indexOf(cliente);
    if (indiceActual == -1) {
        return false;
    }
    puesto.getListaClientes().remove(indiceActual);

    int numeroTurnos=5;

    int nuevaPosicion = Math.min(indiceActual + numeroTurnos, puesto.getListaClientes().size());
    puesto.getListaClientes().add(nuevaPosicion, cliente);
    
    return true;
}
    }
