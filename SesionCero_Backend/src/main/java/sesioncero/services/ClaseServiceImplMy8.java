package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Caracteristica;
import sesioncero.modelo.entities.Clase;
import sesioncero.repository.CaracteristicaRepository;
import sesioncero.repository.ClaseRepository;

@Service
public class ClaseServiceImplMy8 implements ClaseService{

	@Autowired
	private ClaseRepository claseRepository;
	
	@Override
	public Clase findById(int idClase) {
		return claseRepository.findById(idClase).orElse(null);
	}

	@Override
	public List<Clase> findAll() {
		return claseRepository.findAll();
	}

	@Override
	public Clase insertOne(Clase clase) {
		return claseRepository.save(clase);
	}

	@Override
	public boolean deleteOne(int idClase) {
		try {
			if (findById(idClase) != null) {
				claseRepository.deleteById(idClase);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Clase updateOne(Clase clase) {
        try {
			
			if (findById(clase.getIdClase()) != null) {	
				return claseRepository.save(clase);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}

}
