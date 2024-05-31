package sesioncero.modelo.entities;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Personajes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Personaje {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_personaje")
	private int idPersonaje;

	private String nombre;

	@ManyToOne
	@JoinColumn(name = "id_clase")
	private Clase clase;

	@ManyToOne
	@JoinColumn(name = "id_ascendencia")
	private Ascendencia ascendencia;

	@ManyToOne
	@JoinColumn(name = "id_alineamiento")
	private Alineamiento alineamiento;

	@ManyToOne
	@JoinColumn(name = "id_jugador")
	private Jugador jugador;

	private int nivel;

	@Column(name = "CA")
	private int ca;

	@Column(name = "PG")
	private int pg;

	@Column(name = "percepcion_pasiva")
	private int percepcionPasiva;

	private int iniciativa;

	private String cronica;

	private int fuerza;

	@Column(name = "fuerza_mod")
	private int fuerzaMod;

	private int destreza;

	@Column(name = "destreza_mod")
	private int destrezaMod;

	private int constitucion;

	@Column(name = "constitucion_mod")
	private int constitucionMod;

	private int inteligencia;

	@Column(name = "inteligencia_mod")
	private int inteligenciaMod;

	private int sabiduria;

	@Column(name = "sabiduria_mod")
	private int sabiduriaMod;

	private int carisma;

	@Column(name = "carisma_mod")
	private int carismaMod;

	private String retrato; 
}
