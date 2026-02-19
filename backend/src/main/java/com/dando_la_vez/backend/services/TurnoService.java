package com.dando_la_vez.backend.services;


import org.hibernate.mapping.List;
import org.springframework.stereotype.Service;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.model.Puesto;

@Service
public class TurnoService {

    //Obtener ultimo numero de la lista
    public long ultimoNumeroPuestoCliente(Puesto puesto) {
        return puesto.getListaClientes().size();
    }
    
    //asignar ultimo numero de la lista
    public long asignarNumeroTurnoCliente(Puesto puesto, Cliente cliente) {
        return ultimoNumeroPuestoCliente(puesto)+1;
    }

    //Buscar puesto cliente
    public long numeroCliente(Puesto puesto, Cliente cliente){
        return puesto.getListaClientes().indexOf(cliente) + 1;
    }
    //Comprobar turno con puesto
    public Boolean comprobarTurno(Puesto puesto, Cliente cliente) {
    long actual = puesto.getNumeroActual();
    int indiceCliente = puesto.getListaClientes().indexOf(cliente);
    return actual == (indiceCliente + 1);
}

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
    }
