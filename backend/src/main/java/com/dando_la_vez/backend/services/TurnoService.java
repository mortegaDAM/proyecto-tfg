package com.dando_la_vez.backend.services;

import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.model.Turno;
import com.dando_la_vez.backend.repository.PuestoRepository;
import com.dando_la_vez.backend.repository.TurnoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TurnoService {
    @Autowired
    private TurnoRepository turnoRepository;
    @Autowired
    private PuestoService puestoService;


    public List<Turno> getAllTurnos(){
        return turnoRepository.findAll();
    }

    public Optional<Turno> getTurnoId(long id){
        return turnoRepository.findById(id);
    }

    public Turno createTurno(Turno turno){
        return turnoRepository.save(turno);
    }

    public Turno updateTurno(Turno turno){
        return turnoRepository.save(turno);
    }

    public void deleteTurno(long id){
        turnoRepository.deleteById(id);
    }

    //aqui comprueba que si el turno del puesto es igual al turno de cliente
    public boolean comprobarTurno(Turno turno){
        Optional<Puesto> puestoElegido = puestoService.getPuestoId(turno.getPuesto().getId());
        if (puestoElegido.isPresent() && turno.getNumeroTurno() == puestoElegido.get().getNumeroActual()){
            return true;
        }
        return false;
    }

    //Aviso X turnos antes

    //Aplazar turno

    //Cancelar turno

     
}