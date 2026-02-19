package com.dando_la_vez.backend.repository;
import com.dando_la_vez.backend.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TurnoRepository extends JpaRepository<Turno, Long> {
}