package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Salvacion;


public interface SalvacionDao {
	
	    Salvacion findById (int idSalvacion);
	 	List<Salvacion> findAll();
		Salvacion insertOne(Salvacion salvacion);
		int deleteOne(int idSalvacion);
		int updateOne(Salvacion salvacion);

}
