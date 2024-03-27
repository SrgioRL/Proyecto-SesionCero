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
@Table(name="Caracteristicas") // Especifica el nombre de la tabla en la base de datos
@Data // Anotación de Lombok para generar automáticamente getters, setters, toString, etc.
@NoArgsConstructor // Constructor sin argumentos generado automáticamente por Lombok
@AllArgsConstructor 

public class Caracteristica {
	
	@Id // Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria
    @Column(name="id_caracteristica") // Especifica el nombre de la columna en la base de datos
    private int idCaracteristica; // Identificador único de la característica
	@ManyToOne
	@JoinColumn(name="id_personaje")
    private Personaje idPersonaje;
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
	private int sabidura;
	@Column(name="sabidura_mod")
	private String sabiduriaMod;
	private int carisma;
	@Column(name="carisma_mod")
	private String carismaMod;
	
	
	

}
