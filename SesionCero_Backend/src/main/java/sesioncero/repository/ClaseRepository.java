package sesioncero.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sesioncero.modelo.entities.Caracteristica;

public interface ClaseRepository extends JpaRepository<Caracteristica, Integer>{

}
