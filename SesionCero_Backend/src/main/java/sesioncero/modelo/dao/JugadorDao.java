package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Jugador;

public interface JugadorDao {

	    Jugador findById (int idJugador);
		List<Jugador> findAll();
		Jugador insertOne(Jugador jugador);
		int deleteOne(int idJugador);
		int updateOne(Jugador jugador);
}
