package com.dando_la_vez.backend.repository;

import com.dando_la_vez.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente,Integer> {
    Optional<Cliente> findByUid(String uid);
}
