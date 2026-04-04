package com.dando_la_vez.backend.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dando_la_vez.backend.services.MercadoService;
import com.dando_la_vez.backend.model.Mercado;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/mercados")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class MercadoController {
    @Autowired
    private MercadoService mercadoService;

     @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Mercado> listaResultante = mercadoService.getAllMercados();
            response.put("code",1);
            response.put("message", "Obtenida la lista de mercados");
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

    @GetMapping("/mercado/{id}")
    public ResponseEntity<?> getMercadoById(@PathVariable int id){
        Optional<Mercado> mercado = mercadoService.findById(id);
        Map<String, Object> response = new HashMap<>();
        try{
            if(mercado.isPresent()){
                response.put("code",1);
                response.put("message", "Mercado obtenido correctamente");
                response.put("total", 1);
                response.put("data", mercado.get());

            }else{
                response.put("code",1);
                response.put("message", "Mercado no encontrado");
                response.put("total", 0);
                response.put("data", null);
            }
            return ResponseEntity.ok(response);
        }catch(Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createMercado(@RequestBody Mercado mercado){
        Map<String, Object> response = new HashMap<>();
        try{
            Mercado mercadoCreado = mercadoService.createMercado(mercado);
            response.put("code", 1);
            response.put("message","Mercado añadido correctamente");
            response.put("total", 1);
            response.put("data", mercadoCreado);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMercado(@RequestBody Mercado mercado, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Mercado> mercadoEncontrado = mercadoService.findById(id);
            if(mercadoEncontrado.isPresent()){
                Mercado mercadoActualizado = mercadoService.updateMercado(mercado);
                response.put("code",1);
                response.put("message", "Mercado actualizado correctamente");
                response.put("total", 1);
                response.put("data", mercadoActualizado);
            }else{
                response.put("code",1);
                response.put("message", "Mercado no encontrado");
                response.put("total", 0);
                response.put("data", null);
            }
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> nombreMercado(@RequestParam String name){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Mercado> listaResultante = mercadoService.contieneNombre(name);
            response.put("code",1);
            response.put("message", "Obtenida la lista de mercados que tengan el nombre: " + name);
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
}
