package sesioncero.services;

import java.util.List;

import sesioncero.modelo.entities.Alineamiento;

public interface AlineamientoService {
	
    Alineamiento findById (int idAlineamiento);
	List<Alineamiento> findAll();
	Alineamiento insertOne(Alineamiento alineamiento);
	boolean deleteOne(int idAlineamiento);
	Alineamiento updateOne(Alineamiento alineamiento);

}
