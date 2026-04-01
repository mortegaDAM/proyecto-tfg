package com.dando_la_vez.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "mercados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mercado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "mercado")
    @JsonManagedReference("puesto-mercado")
    private List<Puesto> listaPuestos;


    public Mercado(String nombre) {
        this.nombre = nombre;
    }
    public Mercado(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
