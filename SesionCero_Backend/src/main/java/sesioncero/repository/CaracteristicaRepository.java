package sesioncero.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sesioncero.modelo.entities.Caracteristica;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Integer> {
	
	@Query("SELECT c FROM Caracteristica c WHERE c.personaje.idPersonaje = :idPersonaje")
	List<Caracteristica> obtenerCaracteristicasDePersonaje(int idPersonaje);
}
