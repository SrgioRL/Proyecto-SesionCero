package sesioncero.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sesioncero.modelo.entities.Caracteristica;
import sesioncero.modelo.entities.Personaje;

public interface PersonajeRepository extends JpaRepository <Personaje, Integer>{
	

}
