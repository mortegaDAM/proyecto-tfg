package com.dando_la_vez.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.services.TurnoService;
import com.dando_la_vez.backend.services.PuestoService;
import com.dando_la_vez.backend.services.ClienteService;

@RestController
@RequestMapping("api/turnos")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @Autowired
    private PuestoService puestoService;

    @Autowired
    private ClienteService clienteService;

    //Obtener la posición real del cliente en la lista
    @GetMapping("/posicion/puesto/{idPuesto}/cliente/{idCliente}")
    public ResponseEntity<?> obtenerPosicionCliente(@PathVariable int idPuesto, @PathVariable int idCliente) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Puesto> puesto = puestoService.getPuestoId(idPuesto);
            Optional<Cliente> cliente = clienteService.getClienteId(idCliente);

            if (puesto.isPresent() && cliente.isPresent()) {
                // LLamamos al service para obtener el índice + 1
                long posicion = turnoService.numeroCliente(puesto.get(), cliente.get());
                
                response.put("code", 1);
                response.put("message", "Posición obtenida correctamente");
                response.put("data", posicion); // <--- Ahora devuelve el número (long)
                return ResponseEntity.ok(response);
            }
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("code", 2, "message", "Puesto o Cliente no encontrado"));
            
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    //Aplazar turno indicando cuántas posiciones se ha movido
    @PutMapping("/aplazar/puesto/{idPuesto}/cliente/{idCliente}/{posiciones}")
    public ResponseEntity<?> aplazarTurno(@PathVariable int idPuesto, @PathVariable int idCliente, @PathVariable long posiciones) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Puesto> puesto = puestoService.getPuestoId(idPuesto);
            Optional<Cliente> cliente = clienteService.getClienteId(idCliente);

            if (puesto.isPresent() && cliente.isPresent()) {
                boolean exito = turnoService.aplazarTurno(puesto.get(), cliente.get());
                
                if (exito) {
                    response.put("code", 1);
                    // Usamos String.format o concatenación limpia para el mensaje dinámico
                    response.put("message", "Turno aplazado 5 posiciones correctamente");
                    response.put("data", 5); 
                    return ResponseEntity.ok(response);
                }
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("code", 2, "message", "No se pudo realizar el aplazamiento"));
            
        } catch (Exception e) {
            return errorResponse(e);
        }
    }

    private ResponseEntity<?> errorResponse(Exception e) {
        Map<String, Object> response = new HashMap<>();
        response.put("code", 2);
        response.put("message", "Error de ejecución");
        response.put("cause", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}