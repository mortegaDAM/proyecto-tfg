package com.dando_la_vez.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "clientes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String nombre;
    @Column
    private String email;


    @JsonBackReference("cliente-turno-puesto")
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "turnos",
            joinColumns = {@JoinColumn(name = "id_cliente")},
            inverseJoinColumns = {@JoinColumn(name = "id_puesto")})
    private Set<Puesto> listaPuestos;

    public Cliente(String email, String nombre) {
        this.email = email;
        this.nombre = nombre;
    }

    public void addPuestos(Puesto puesto){
        listaPuestos.add(puesto);
        puesto.getListaClientes().add(this);
    }
}
