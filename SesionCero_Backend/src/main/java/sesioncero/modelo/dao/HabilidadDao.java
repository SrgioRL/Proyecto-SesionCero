package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Habilidad;

public interface HabilidadDao {
	
	    Habilidad findById (int idHabilidad);
		List<Habilidad> findAll();
		Habilidad insertOne(Habilidad habilidad);
		int deleteOne(int idHabilidad);
		int updateOne(Habilidad habilidad);

}
