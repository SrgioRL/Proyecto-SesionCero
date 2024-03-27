package sesioncero.modelo.dao;

import java.util.List;
import sesioncero.modelo.entities.Ascendencia;

public interface AscendenciaDao {

	    Ascendencia findById (int idAscendencia);
		List<Ascendencia> findAll();
		Ascendencia insertOne(Ascendencia ascendencia);
		int deleteOne(int idAscendencia);
		int updateOne(Ascendencia ascendencia);
		
}
