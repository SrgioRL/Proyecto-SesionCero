package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Jugador;
import sesioncero.modelo.entities.Personaje;

public interface PersonajeService {

	Personaje findById(int idPersonaje);

	List<Personaje> findAll();

	Personaje insertOne(Personaje personaje);

	boolean deleteOne(int idPersonaje);

	Personaje updateOne(Personaje personaje);

	List<Personaje> findPersonajeByJugador(Jugador jugador);

}
