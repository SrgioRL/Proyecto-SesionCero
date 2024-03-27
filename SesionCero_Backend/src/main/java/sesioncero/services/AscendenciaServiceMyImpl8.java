package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sesioncero.modelo.entities.Ascendencia;
import sesioncero.repository.AscendenciaRepository;

@Service
public class AscendenciaServiceMyImpl8 implements AscendenciaService {
	
	@Autowired
	private AscendenciaRepository ascendenciaRepository;
	
	@Override
	public Ascendencia findById(int idAscendencia) {
		return ascendenciaRepository.findById(idAscendencia).orElse(null);
	}

	@Override
	public List<Ascendencia> findAll() {
		return ascendenciaRepository.findAll();
	}

	@Override
	public Ascendencia insertOne(Ascendencia ascendencia) {
		return ascendenciaRepository.save(ascendencia);
	}

	@Override
	public boolean deleteOne(int idAscendencia) {
		try {
			if (findById(idAscendencia) != null) {
				ascendenciaRepository.deleteById(idAscendencia);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Ascendencia updateOne(Ascendencia ascendencia) {
        try {
			
			if (findById(ascendencia.getIdAscendencia()) != null) {	
				return ascendenciaRepository.save(ascendencia);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}
}
