package com.dando_la_vez.backend.services;

import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.model.Usuario;
import com.dando_la_vez.backend.repository.PuestoRepository;
import com.dando_la_vez.backend.repository.UsuarioRepository;
import com.dando_la_vez.backend.repository.ClienteRepository;
import com.dando_la_vez.backend.model.Cliente;
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
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ClienteRepository clienteRepository;

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
        
        // Aumentar el número actual
        long numeroActual = puesto.getNumeroActual();
        puesto.setNumeroActual(numeroActual + 1);

        // Auto-limpieza: Eliminar a la primera persona de la lista de espera (la que acaba de ser llamada)
        if (puesto.getListaClientes() != null && !puesto.getListaClientes().isEmpty()) {
            puesto.getListaClientes().remove(0);
        }
    }

    //Logica para unir a un cliente a la cola de un puesto
    public void unirseACola(Puesto puesto, int idCliente) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(idCliente);
        if (clienteOpt.isPresent()) {
            Cliente cliente = clienteOpt.get();
            
            // Check for duplicates
            boolean yaEstaEnCola = puesto.getListaClientes().stream()
                .anyMatch(c -> c.getId() == idCliente);
            
            if (!yaEstaEnCola) {
                puesto.getListaClientes().add(cliente);
                puestoRepository.save(puesto);
            }
        }
    }

    //Logica para reiniciar puestos
    public void reiniciarPuestos(Puesto puesto){
        puesto.setNumeroActual(0);
        if(puesto.getListaClientes() != null){
            puesto.listaClientes.clear();
        }
    }

    // Comprobar si el uid que se pasa es del dueño
    public boolean esDueno(String uid, Puesto puesto){
        int idUsuario = puesto.getUsuario().getId();
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        if(usuario.isPresent()) {
            return usuario.get().getUid().equals(uid);
        }
        return false;
    }
}
