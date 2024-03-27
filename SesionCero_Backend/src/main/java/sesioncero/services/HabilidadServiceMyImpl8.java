package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Habilidad;
import sesioncero.repository.HabilidadRepository;


@Service

public class HabilidadServiceMyImpl8 implements HabilidadService {
	
	@Autowired
	private HabilidadRepository habilidadRepository;
	
	@Override
	public Habilidad findById(int idHabilidad) {
		return habilidadRepository.findById(idHabilidad).orElse(null);
	}

	@Override
	public List<Habilidad> findAll() {
		return habilidadRepository.findAll();
	}

	@Override
	public Habilidad insertOne(Habilidad habilidad) {
		return habilidadRepository.save(habilidad);
	}

	@Override
	public boolean deleteOne(int idHabilidad) {
		try {
			if (findById(idHabilidad) != null) {
				habilidadRepository.deleteById(idHabilidad);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Habilidad updateOne(Habilidad habilidad) {
        try {
			
			if (findById(habilidad.getIdHabilidad()) != null) {	
				return habilidadRepository.save(habilidad);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}


}
