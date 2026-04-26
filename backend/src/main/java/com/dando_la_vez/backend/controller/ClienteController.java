package com.dando_la_vez.backend.controller;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/clientes")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE,RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST})
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Cliente> listaResultante = clienteService.getAllCliente();
            response.put("code",1);
            response.put("message", "Obtenida la lista de clientes");
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

    @GetMapping("/cliente/id/{id}")
    public ResponseEntity<?> getClienteId(@PathVariable int id){
        Optional<Cliente> cliente = clienteService.getClienteId(id);
        Map<String, Object> response = new HashMap<>();
        try{
            if(cliente.isPresent()){
                response.put("code",1);
                response.put("message", "Cliente obtenido correctamente");
                response.put("total", 1);
                response.put("data", cliente.get());

            }else{
                response.put("code",1);
                response.put("message", "Cliente no encontrado");
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

    @GetMapping("/cliente/uid/{uid}")
    public ResponseEntity<?> getClienteUid(@PathVariable String uid){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Cliente> cliente = clienteService.getClienteUid(uid);
            if(cliente.isPresent()){
                response.put("code",1);
                response.put("message", "Usuario obtenido correctamente");
                response.put("total", 1);
                response.put("data", cliente.get());
            }else{
                response.put("code",1);
                response.put("message", "Usuario no encontrado");
                response.put("total", 0);
                response.put("data", null);
            }
            return ResponseEntity.ok(response);

        }catch (Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente){
        Map<String, Object> response = new HashMap<>();
        try{
            // si no tiene uid (no es un usuario) se crea uno
            if(cliente.getUid() == null){
                cliente.setUid(UUID.randomUUID().toString());
            }
            Optional<Cliente> clientePresente = clienteService.getClienteUid(cliente.getUid());
            if(clientePresente.isPresent()){
                response.put("code", 1);
                response.put("message","Cliente anteriormente añadido");
                response.put("total", 1);
                response.put("data", clientePresente.get());
            }else{
                Cliente clienteAdd = clienteService.createCliente(cliente);
                response.put("code", 1);
                response.put("message","Cliente añadido correctamente");
                response.put("total", 1);
                response.put("data", clienteAdd);
            }
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // /nuevoTurno/1?idPuesto=1
    @PutMapping("/nuevoTurno/{id}")
    public ResponseEntity<?> nuevoTurno(@PathVariable int id, @RequestParam int idPuesto){
        Map<String, Object> response = new HashMap<>();
        try{
            Cliente cliente = clienteService.pedirTurno(id,idPuesto);
            long total = cliente.getListaPuestos().stream().count();
            response.put("code", 1);
            response.put("message","Puesto agregado correctamente");
            response.put("data", cliente);
            response.put("size", cliente.getListaPuestos());
            response.put("total", total);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }












}
