package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Clase;

public interface ClaseService {
	
	    Clase findById (int idClase);
		List<Clase> findAll();
		Clase insertOne(Clase clase);
		boolean deleteOne(int idClase);
		Clase updateOne(Clase clase);

}
