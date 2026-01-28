package com.dando_la_vez.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue
    private long id;
    @Column
    private String nombre;
    @Column
    private String email;
    @Column
    private String uid;
    //@OneToMany(mappedBy = )

    public Usuario(String nombre, String email, String uid) {
        this.nombre = nombre;
        this.email = email;
        this.uid = uid;
    }
}
