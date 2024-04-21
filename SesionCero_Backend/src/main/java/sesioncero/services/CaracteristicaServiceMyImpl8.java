package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Caracteristica;
import sesioncero.repository.CaracteristicaRepository;

@Service
public class CaracteristicaServiceMyImpl8 implements CaracteristicaService {
	
	@Autowired
	private CaracteristicaRepository caracteristicaRepository;
	
	@Override
	public Caracteristica findById(int idCaracteristica) {
		return caracteristicaRepository.findById(idCaracteristica).orElse(null);
	}

	@Override
	public List<Caracteristica> findAll() {
		return caracteristicaRepository.findAll();
	}

	@Override
	public Caracteristica insertOne(Caracteristica caracteristica) {
		return caracteristicaRepository.save(caracteristica);
	}

	@Override
	public boolean deleteOne(int idCaracteristica) {
		try {
			if (findById(idCaracteristica) != null) {
				caracteristicaRepository.deleteById(idCaracteristica);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Caracteristica updateOne(Caracteristica caracteristica) {
        try {
			
			if (findById(caracteristica.getIdCaracteristica()) != null) {	
				return caracteristicaRepository.save(caracteristica);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}

	@Override
	public List<Caracteristica> obtenerCaracteristicasDePersonaje(int idPersonaje) {
	return caracteristicaRepository.obtenerCaracteristicasDePersonaje(idPersonaje);
	}

	

}
