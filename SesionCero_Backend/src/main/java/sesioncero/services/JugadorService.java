package sesioncero.services;

import java.util.List;
import java.util.Optional;

import sesioncero.modelo.entities.Jugador;

public interface JugadorService {
    Jugador findById(int idJugador);
    List<Jugador> findAll();
    Jugador insertOne(Jugador jugador);
    boolean deleteOne(int idJugador);
    Jugador updateOne(Jugador jugador);
    Optional<Jugador> findByEmail(String email);
}
