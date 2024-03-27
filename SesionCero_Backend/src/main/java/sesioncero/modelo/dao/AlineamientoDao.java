package sesioncero.modelo.dao;

import java.util.List;

import sesioncero.modelo.entities.Alineamiento;

public interface AlineamientoDao {
	
    Alineamiento findById (int idAlineamiento);
	List<Alineamiento> findAll();
	Alineamiento insertOne(Alineamiento alineamiento);
	int deleteOne(int idAlineamiento);
	int updateOne(Alineamiento alineamiento);

}
