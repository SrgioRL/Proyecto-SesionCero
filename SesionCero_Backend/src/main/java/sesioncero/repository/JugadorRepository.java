package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sesioncero.modelo.entities.Jugador;

import java.util.Optional;

public interface JugadorRepository extends JpaRepository<Jugador, Integer> {
    Optional<Jugador> findByEmail(String email);
}