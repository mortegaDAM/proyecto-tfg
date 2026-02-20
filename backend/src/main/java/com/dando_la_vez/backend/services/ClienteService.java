package com.dando_la_vez.backend.services;

import com.dando_la_vez.backend.model.Cliente;
import com.dando_la_vez.backend.model.Puesto;
import com.dando_la_vez.backend.repository.ClienteRepository;
import com.dando_la_vez.backend.repository.PuestoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PuestoRepository puestoRepository;

    public List<Cliente> getAllCliente(){
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteId(int id){
        return clienteRepository.findById(id);
    }

    public Cliente createCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public Cliente pedirTurno(int idCliente, int idPuesto){
        Cliente clienteEncontrado = clienteRepository.findById(idCliente).get();
        Puesto puestoEncontrado = puestoRepository.findById(idPuesto).get();
        clienteEncontrado.addPuestos(puestoEncontrado);
        return clienteEncontrado;
    }
}
