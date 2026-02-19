package com.dando_la_vez.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String nombre;
    @Column
    private String email;
    @Column
    private String uid;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference("puesto-usuario")
    private List<Puesto> listaPuestos;

    public Usuario(String nombre, String email, String uid) {
        this.nombre = nombre;
        this.email = email;
        this.uid = uid;
    }
}
