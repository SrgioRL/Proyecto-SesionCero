package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Caracteristica;

public interface CaracteristicaDao {
	
	    Caracteristica findById (int idCaracteristica);
		List<Caracteristica> findAll();
		Caracteristica insertOne(Caracteristica caracteristica);
		int deleteOne(int idCaracteristica);
		int updateOne(Caracteristica caracteristica);

}
