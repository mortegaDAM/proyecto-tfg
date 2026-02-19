package com.dando_la_vez.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "turnos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Turno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_puesto")
    private Puesto puesto;
    private int numeroTurno;

    public Turno(Cliente cliente, Puesto puesto, int numeroTurno) {
        this.cliente = cliente;
        this.puesto = puesto;
        this.numeroTurno = numeroTurno;
    }
    
}
