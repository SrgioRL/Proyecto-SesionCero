package sesioncero.modelo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // Indica que esta clase es una entidad JPA
@Table(name="Ascendencias") // Especifica el nombre de la tabla en la base de datos
@Data // Anotación de Lombok para generar automáticamente getters, setters, toString, etc.
@NoArgsConstructor // Constructor sin argumentos generado automáticamente por Lombok
@AllArgsConstructor

public class Ascendencia {
	

    @Id // Indica que este campo es la clave primaria de la entidad
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática de valores para la clave primaria
    @Column(name="id_ascendencia") // Especifica el nombre de la columna en la base de datos
    private int idAscendencia; // Identificador único de la ascendencia
    private String nombre;
    private String descripcion;

}
