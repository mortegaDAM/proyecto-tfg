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
import com.dando_la_vez.backend.services.ClienteService; // Asumiendo que existe

@RestController
@RequestMapping("api/turnos")
@CrossOrigin(origins = "*", methods = { RequestMethod.DELETE, RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT })
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @Autowired
    private PuestoService puestoService;

    @Autowired
    private ClienteService clienteService;

    // 1. Comprobar turno con puesto
    @GetMapping("/comprobar/puesto/{idPuesto}/cliente/{idCliente}")
    public ResponseEntity<?> comprobarTurno(@PathVariable int idPuesto, @PathVariable int idCliente) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Puesto> puesto = puestoService.getPuestoId(idPuesto);
            Optional<Cliente> cliente = clienteService.getClienteId(idCliente);

            if (puesto.isPresent() && cliente.isPresent()) {
                boolean esSuTurno = turnoService.comprobarTurno(puesto.get(), cliente.get());
                response.put("code", 1);
                response.put("message", esSuTurno ? "Es el turno del cliente" : "Aún no es su turno");
                response.put("data", esSuTurno);
                return ResponseEntity.ok(response);
            } else {
                response.put("code", 1);
                response.put("message", "Puesto o Cliente no encontrado");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("code", 2);
            response.put("message", "Error de ejecución");
            response.put("cause", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 2. Aplazar turno
    @PutMapping("/aplazar/puesto/{idPuesto}/cliente/{idCliente}/{posiciones}")
    public ResponseEntity<?> aplazarTurno(@PathVariable int idPuesto, @PathVariable int idCliente,
            @PathVariable long posiciones) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Puesto> puesto = puestoService.getPuestoId(idPuesto);
            Optional<Cliente> cliente = clienteService.getClienteId(idCliente);

            if (puesto.isPresent() && cliente.isPresent()) {
                boolean realizado = turnoService.aplazarTurno(puesto.get(), cliente.get(), posiciones);
                if (realizado) {
                    response.put("code", 1);
                    response.put("message", "Turno aplazado correctamente " + posiciones + " posiciones");
                    return ResponseEntity.ok(response);
                } else {
                    response.put("code", 1);
                    response.put("message", "El cliente no se encuentra en la cola de este puesto");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            response.put("code", 2);
            response.put("message", "Error de ejecución");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 3. Eliminar turno (Cancelar)
    @DeleteMapping("/eliminar/puesto/{idPuesto}/cliente/{idCliente}")
    public ResponseEntity<?> eliminarTurno(@PathVariable int idPuesto, @PathVariable int idCliente) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<Puesto> puesto = puestoService.getPuestoId(idPuesto);
            Optional<Cliente> cliente = clienteService.getClienteId(idCliente);

            if (puesto.isPresent() && cliente.isPresent()) {
                boolean eliminado = turnoService.cancelarTurno(puesto.get(), cliente.get());
                if (eliminado) {
                    response.put("code", 1);
                    response.put("message", "Turno cancelado correctamente");
                    return ResponseEntity.ok(response);
                } else {
                    response.put("code", 1);
                    response.put("message", "No se pudo eliminar el turno (cliente no estaba en cola)");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            response.put("code", 2);
            response.put("message", "Error de ejecución");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}