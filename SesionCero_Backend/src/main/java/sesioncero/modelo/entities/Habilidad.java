package sesioncero.modelo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Indica que esta clase es una entidad JPA
@Table(name="Habilidades") // Especifica el nombre de la tabla en la base de datos
@Data // Anotación de Lombok para generar automáticamente getters, setters, toString, etc.
@NoArgsConstructor // Constructor sin argumentos generado automáticamente por Lombok
@AllArgsConstructor

public class Habilidad {
	
	@Id // Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria
    @Column(name="id_habilidad") // Especifica el nombre de la columna en la base de datos
    private int idHabilidad; // Identificador único de la habilidad
    @ManyToOne
	@JoinColumn(name="id_personaje")
    private Personaje idPersonaje;
    private String atletismo;
    private String acrobacias;
    @Column(name="juego_de_manos")
    private String juegoDeManos;
    private String sigilo;
    private String arcano;
    private String historia;
    private String investigacion;
    private String naturaleza;
    private String religion;
    @Column(name="trato_de_animales")
    private String tratoDeAnimales;
    private String medicina;
    private String percepcion;
    private String perspicacia;
    private String supervivencia;
    private String engano;
    private String intimidacion;
    private String interpretacion;
    private String persuasion;

	

}
