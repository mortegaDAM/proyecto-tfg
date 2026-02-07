package com.dando_la_vez.backend.controller;

import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.services.PuestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/puestos")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class PuestoController {
    @Autowired
    private PuestoService puestoService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllPuestos(){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Puesto> listaResultante = puestoService.getAllPuestos();
            response.put("code",1);
            response.put("message", "Obtenida la lista de puestos");
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

    @GetMapping("/puesto/{id}")
    public ResponseEntity<?> getPuestoById(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Puesto> puesto = puestoService.getPuestoId(id);
            if(puesto.isPresent()){
                response.put("code",1);
                response.put("message", "Puesto obtenido correctamente");
                response.put("total", 1);
                response.put("data", puesto.get());
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Puesto no encontrado");
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
    public ResponseEntity<?> createPuesto(@RequestBody Puesto puesto){
        Map<String, Object> response = new HashMap<>();
        try{
            Puesto puestoCreado = puestoService.createPuesto(puesto);
            response.put("code", 1);
            response.put("message","Puesto añadido correctamente");
            response.put("total", 1);
            response.put("data", puestoCreado);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePuesto(@PathVariable int id, @RequestBody Puesto puesto){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Puesto> puestoEncontrado = puestoService.getPuestoId(id);
            if(puestoEncontrado.isPresent()){
                Puesto puestoActualizado = puestoService.updatePuesto(puesto);
                response.put("code",1);
                response.put("message", "Puesto actualizado correctamente");
                response.put("total", 1);
                response.put("data", puestoActualizado);
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Puesto no encontrado");
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
    public ResponseEntity<?> deletePuestoById(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Puesto> puestoEncontrado = puestoService.getPuestoId(id);
            if(puestoEncontrado.isPresent()){
                puestoService.deletePuesto(id);
                response.put("code",1);
                response.put("message", "Puesto borrado correctamente");
                response.put("total", 1);
                response.put("data", puestoEncontrado.get());
                return ResponseEntity.ok(response);
            }else {
                response.put("code",1);
                response.put("message", "Puesto no borrado porque no se ha encontrado");
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
}
