package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Clase;

public interface ClaseDao {
	
	    Clase findById (int idClase);
		List<Clase> findAll();
		Clase insertOne(Clase clase);
		int deleteOne(int idClase);
		int updateOne(Clase clase);

}
