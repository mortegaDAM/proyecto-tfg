package com.dando_la_vez.backend.repository;
import com.dando_la_vez.backend.model.Mercado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MercadoRepository  extends JpaRepository<Mercado,Integer> {
    List<Mercado> findByNombreContainingIgnoreCase(String nombre);
}
