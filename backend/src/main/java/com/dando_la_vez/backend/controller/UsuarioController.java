package com.dando_la_vez.backend.controller;

import com.dando_la_vez.backend.model.Usuario;
import com.dando_la_vez.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/usuarios")
@CrossOrigin(origins = "*", methods = {RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    // CODIGO
        // 1 -> OK
        // 2 -> ERROR
        // 3 -> WARNING

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        Map<String, Object> response = new HashMap<>();
        try{
            List<Usuario> listaResultante = usuarioService.getAllUser();
            response.put("code",1);
            response.put("message", "Obtenida la lista de usuarios");
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

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> getUsuarioById(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Usuario> usuario = usuarioService.findById(id);
            if(usuario.isPresent()){
                response.put("code",1);
                response.put("message", "Usuario obtenido correctamente");
                response.put("total", 1);
                response.put("data", usuario.get());

            }else{
                response.put("code",1);
                response.put("message", "Usuario no encontrado");
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

    @GetMapping("/findUid/{uid}")
    public ResponseEntity<?> findByUid(@PathVariable String uid){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Usuario> usuario = usuarioService.getUsuarioUid(uid);
            if(usuario.isEmpty()){
                response.put("code",1);
                response.put("message", "Usuario no encontrado");
                response.put("total", 0);
                response.put("data", null);
            }else{
                response.put("code",1);
                response.put("message", "Usuario obtenido correctamente");
                response.put("total", 1);
                response.put("data", usuario);
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
    public ResponseEntity<?> createUser(@RequestBody Usuario usuario){
        Map<String, Object> response = new HashMap<>();
        try{
            Usuario usuarioCreado = usuarioService.createUsuario(usuario);
            response.put("code", 1);
            response.put("message","Usuario añadido correctamente");
            response.put("total", 1);
            response.put("data", usuarioCreado);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody Usuario usuario, @PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Usuario> usuarioEncontrado = usuarioService.findById(id);
            if(usuarioEncontrado.isPresent()){
                Usuario usuarioActualizado = usuarioService.updateUsuario(usuario);
                response.put("code",1);
                response.put("message", "Usuario actualizado correctamente");
                response.put("total", 1);
                response.put("data", usuarioActualizado);
            }else{
                response.put("code",1);
                response.put("message", "Usuario no encontrado");
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Usuario> usuarioEncontrado = usuarioService.findById(id);
            if(usuarioEncontrado.isPresent()){
                usuarioService.deleteById(id);
                response.put("code",1);
                response.put("message", "Usuario borrado correctamente");
                response.put("total", 1);
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Usuario no borrado porque no se ha encontrado");
                response.put("total", 0);
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/listaPuestos/{id}")
    public ResponseEntity<?> sacarListaPuestosUsuario(@PathVariable int id){
        Map<String, Object> response = new HashMap<>();
        try{
            Optional<Usuario> usuarioOptional = usuarioService.findById(id);
            if(usuarioOptional.isPresent()){
                response.put("code",1);
                response.put("message", "Usuario borrado correctamente");
                response.put("size", usuarioOptional.get().getListaPuestos().size());
                response.put("data", usuarioOptional.get().getListaPuestos());
                return ResponseEntity.ok(response);
            }else{
                response.put("code",1);
                response.put("message", "Usuario no encontrado");
                response.put("total", 0);
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            response.put("code",2);
            response.put("message", "error de ejecucion");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
