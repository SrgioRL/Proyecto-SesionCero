package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Salvacion;


public interface SalvacionService {
	
	    Salvacion findById (int idSalvacion);
	 	List<Salvacion> findAll();
		Salvacion insertOne(Salvacion salvacion);
		boolean deleteOne(int idSalvacion);
		Salvacion updateOne(Salvacion salvacion);

}
