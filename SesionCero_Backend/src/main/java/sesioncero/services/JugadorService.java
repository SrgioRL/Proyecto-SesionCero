package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Jugador;

public interface JugadorService {

	    Jugador findById (int idJugador);
		List<Jugador> findAll();
		Jugador insertOne(Jugador jugador);
		boolean deleteOne(int idJugador);
		Jugador updateOne(Jugador jugador);
}
