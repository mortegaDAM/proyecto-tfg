package com.dando_la_vez.backend.controller;

import com.dando_la_vez.backend.model.Turno;
import com.dando_la_vez.backend.services.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/turnos")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class TurnoController {
    @Autowired
    private TurnoService turnoService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllTurnos(){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Turno> listaResultante = turnoService.getAllTurnos();
            response.put("code",1);
            response.put("message", "Obtenida la lista de turnos");
            response.put("size", listaResultante.size());
            response.put("data", listaResultante);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/turno/{id}")
    public ResponseEntity<?> getTurnos(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Turno> turno = turnoService.getTurnoId(id);
            if(turno.isPresent()){
                response.put("code",1);
                response.put("message", "Turno obtenido correctamente");
                response.put("total", 1);
                response.put("data", turno.get());
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Turno no encontrado");
                response.put("total", 1);
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTurno(@RequestBody Turno turno){
        Map<String, Object> response = new HashMap<>();
        try{
            Turno turnoCreado = turnoService.createTurno(turno);
            response.put("code", 1);
            response.put("message","Turno añadido correctamente");
            response.put("total", 1);
            response.put("data", turnoCreado);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTurno(@PathVariable int id, @RequestBody Turno turno){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Turno> turnoEncontrado = turnoService.getTurnoId(id);
            if(turnoEncontrado.isPresent()){
                Turno turnoActualizado = turnoService.updateTurno(turno);
                response.put("code",1);
                response.put("message", "Turno actualizado correctamente");
                response.put("total", 1);
                response.put("data", turnoActualizado);
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Turno no encontrado");
                response.put("total", 1);
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTurnoById(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Turno> turnoEncontrado = turnoService.getTurnoId(id);
            if(turnoEncontrado.isPresent()){
                turnoService.deleteTurno(id);
                response.put("code",1);
                response.put("message", "Turno borrado correctamente");
                response.put("total", 1);
                response.put("data", turnoEncontrado.get());
                return ResponseEntity.ok(response);
            }else {
                response.put("code",1);
                response.put("message", "Turno no borrado porque no se ha encontrado");
                response.put("total", 0);
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Comprobar si turno del puesto es igual al del cliente
    @PostMapping("/comprobar")
    public ResponseEntity<?> comprobarTurno(@RequestBody Turno turno){
        Map<String, Object> response = new HashMap<>();
        try{
            boolean resultado = turnoService.comprobarTurno(turno);
            response.put("code",1);
            response.put("message", "Comprobacion realizada correctamente");
            response.put("total", 1);
            response.put("data", resultado);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //Aviso X turnos antes

    //Aplazar turno

    //Cancelar turno
}
