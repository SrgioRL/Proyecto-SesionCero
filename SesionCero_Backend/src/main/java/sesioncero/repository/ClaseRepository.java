package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sesioncero.modelo.entities.Clase;

public interface ClaseRepository extends JpaRepository<Clase, Integer> {

}
