package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Habilidad;

public interface HabilidadService {
	
	    Habilidad findById (int idHabilidad);
		List<Habilidad> findAll();
		Habilidad insertOne(Habilidad habilidad);
		boolean deleteOne(int idHabilidad);
		Habilidad updateOne(Habilidad habilidad);

}
