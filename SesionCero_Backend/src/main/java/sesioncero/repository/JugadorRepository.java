package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import sesioncero.modelo.entities.Jugador;

public interface JugadorRepository extends JpaRepository<Jugador, Integer> {
    Optional<Jugador> findByEmail(String email); 
}