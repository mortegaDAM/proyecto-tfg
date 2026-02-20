package com.dando_la_vez.backend.repository;

import com.dando_la_vez.backend.model.Usuario;
import org.hibernate.boot.models.JpaAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByUid(String uid);
}
