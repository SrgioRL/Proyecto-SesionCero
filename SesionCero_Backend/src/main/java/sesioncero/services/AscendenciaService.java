package sesioncero.services;

import java.util.List;
import sesioncero.modelo.entities.Ascendencia;

public interface AscendenciaService {

	    Ascendencia findById (int idAscendencia);
		List<Ascendencia> findAll();
		Ascendencia insertOne(Ascendencia ascendencia);
		boolean deleteOne(int idAscendencia);
		Ascendencia updateOne(Ascendencia ascendencia);
		
}
