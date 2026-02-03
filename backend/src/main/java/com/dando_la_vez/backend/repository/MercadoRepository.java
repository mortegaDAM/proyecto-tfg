package com.dando_la_vez.backend.repository;
import com.dando_la_vez.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MercadoRepository  extends JpaRepository<Usuario,Long> {

}
