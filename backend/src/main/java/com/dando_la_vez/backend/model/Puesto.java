package com.dando_la_vez.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "puestos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Puesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String nombre;
    @Column
    private boolean abierto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @JsonBackReference("puesto-usuario")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mercado")
    @JsonBackReference("puesto-mercado")
    private Mercado mercado;
    private long numeroActual;

//    @JsonManagedReference("cliente-turno-puesto")
    @ManyToMany(mappedBy = "listaPuestos")
    public List<Cliente> listaClientes;


    public Puesto(String nombre, boolean abierto) {
        this.nombre = nombre;
        this.abierto = abierto;
    }

    public Puesto(String nombre, boolean abierto, Usuario usuario, Mercado mercado) {
        this.nombre = nombre;
        this.abierto = abierto;
        this.usuario = usuario;
        this.mercado = mercado;
    }
    public Puesto(int id, String nombre, boolean abierto, Usuario usuario, Mercado mercado, long numeroActual) {
        this.id = id;
        this.nombre = nombre;
        this.abierto = abierto;
        this.usuario = usuario;
        this.mercado = mercado;
        this.numeroActual = numeroActual;
    }
}
