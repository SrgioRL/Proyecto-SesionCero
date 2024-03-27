package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sesioncero.modelo.entities.Jugador;

public interface JugadorRepository extends JpaRepository <Jugador, Integer>{

}
