package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sesioncero.modelo.entities.Personaje;

public interface PersonajeRepository extends JpaRepository <Personaje, Integer>{

}
