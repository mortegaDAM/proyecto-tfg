package com.dando_la_vez.backend.services;

import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.repository.PuestoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PuestoService {
    @Autowired
    private PuestoRepository puestoRepository;

    public List<Puesto> getAllPuestos(){
        return puestoRepository.findAll();
    }

    public Optional<Puesto> getPuestoId(long id){
        return puestoRepository.findById(id);
    }

    public Puesto createPuesto(Puesto puesto){
        return puestoRepository.save(puesto);
    }

    public Puesto updatePuesto(Puesto puesto){
        return puestoRepository.save(puesto);
    }

    public void deletePuesto(long id){
        puestoRepository.deleteById(id);
    }

    //Aqui va la logica de aumentar turno de puesto
    public void aumentarTurnoPuesto(Puesto puesto) {
        if (puesto == null) {
            throw new IllegalArgumentException("Puesto cannot be null");
        }
        long numeroActual = puesto.getNumeroActual();
        puesto.setNumeroActual(numeroActual + 1);
    }

    //Logica para reiniciar puestos con ??
    public void reiniciarPuestos(Puesto puesto){
        puesto.setNumeroActual(0);
        if(puesto.getListaClientes() != null){
            puesto.listaClientes.clear();
        }
    }

}
