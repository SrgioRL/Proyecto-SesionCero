package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Personaje;

public interface PersonajeDao {
	
	    Personaje findById (int idPersonaje);
		List<Personaje> findAll();
		Personaje insertOne(Personaje personaje);
		int deleteOne(int idPersonaje);
		int updateOne(Personaje personaje); 

}
