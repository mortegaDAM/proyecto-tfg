package com.dando_la_vez.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mercados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mercado {
    @Column(name = "id")
    private long id;
    @Column(name = "nombre")
    private String nombre;

    //One to Many??
}
