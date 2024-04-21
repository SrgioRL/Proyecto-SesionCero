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
@Table(name="Salvaciones") // Especifica el nombre de la tabla en la base de datos
@Data // Anotación de Lombok para generar automáticamente getters, setters, toString, etc.
@NoArgsConstructor // Constructor sin argumentos generado automáticamente por Lombok
@AllArgsConstructor

public class Salvacion {
	
	@Id // Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria
    @Column(name="id_salvacion") // Especifica el nombre de la columna en la base de datos
    private int idSalvacion; // Identificador único de la salvación
    @ManyToOne
	@JoinColumn(name="id_personaje")
    private Personaje personaje;
    @Column(name="salvacion_fuerza")
    private String salvacionFuerza;
    @Column(name="salvacion_destreza")
    private String salvacionDestreza;
    @Column(name="salvacion_constitucion")
    private String salvacionConstitucion;
    @Column(name="salvacion_inteligencia")
    private String salvacionInteligencia;
    @Column(name="salvacion_sabiduria")
    private String salvacionSabiduria;
    @Column(name="salvacion_carisma")
    private String salvacionCarisma;

}
