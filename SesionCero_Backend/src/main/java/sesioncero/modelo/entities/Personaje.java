package sesioncero.modelo.entities;

import java.sql.Blob;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Indica que esta clase es una entidad JPA
@Table(name="Personajes") // Especifica el nombre de la tabla en la base de datos
@Data // Anotación de Lombok para generar automáticamente getters, setters, toString, etc.
@NoArgsConstructor // Constructor sin argumentos generado automáticamente por Lombok
@AllArgsConstructor
public class Personaje {
	

    @Id // Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria
    @Column(name="id_personaje") // Especifica el nombre de la columna en la base de datos
    private int idPersonaje; // Identificador único del personaje
    private String nombre;
    @ManyToOne
	@JoinColumn(name="id_clase")
    private Clase clase;
    @ManyToOne
	@JoinColumn(name="id_ascendencia")
    private Ascendencia ascendencia;
    @ManyToOne
	@JoinColumn(name="id_alineamiento")
    private Alineamiento alineamiento;

    @ManyToOne
	@JoinColumn(name="id_jugador")
    private Jugador jugador;
    
    private int nivel;
    @Column(name="CA")
    private int ca;
    @Column(name="PG")
    private int pg;
    @Column(name="percepcion_pasiva")
    private int percepcionPasiva;
    private int iniciativa;
    private String cronica;
    private int fuerza;
    @Column(name="fuerza_mod")
    private String fuerzaMod;
    private int destreza;
    @Column(name="destreza_mod")
    private String destrezaMod;
    private int constitucion;
    @Column(name="constitucion_mod")
    private String constitucionMod;
    private int inteligencia;
    @Column(name="inteligencia_mod")
    private String inteligenciaMod;
    private int sabiduria;
    @Column(name="sabiduria_mod")
    private String sabiduriaMod;
    private int carisma;
    @Column(name="carisma_mod")
    private String carismaMod;
    private Blob retrato;
   
   

}
