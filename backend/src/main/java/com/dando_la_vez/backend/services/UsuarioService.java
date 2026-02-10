package com.dando_la_vez.backend.services;

import com.dando_la_vez.backend.model.Usuario;
import com.dando_la_vez.backend.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> getAllUser(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(long id){
        return usuarioRepository.findById(id);
    }

    public Usuario createUsuario(Usuario usuario){
        // analizar si el usuario esta en la bbdd
        return usuarioRepository.save(usuario);
    }

    public Usuario updateUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public Usuario getUsuarioUid(String uid){
        return usuarioRepository.findByUid(uid);
    }

    public void deleteById(long id){
        usuarioRepository.deleteById(id);
    }

}
