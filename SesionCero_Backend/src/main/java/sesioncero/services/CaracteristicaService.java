package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Caracteristica;

public interface CaracteristicaService {
	
	    Caracteristica findById (int idCaracteristica);
		List<Caracteristica> findAll();
		Caracteristica insertOne(Caracteristica caracteristica);
		boolean deleteOne(int idCaracteristica);
		Caracteristica updateOne(Caracteristica caracteristica);
		List<Caracteristica> obtenerCaracteristicasDePersonaje(int idPersonaje);
		

}
