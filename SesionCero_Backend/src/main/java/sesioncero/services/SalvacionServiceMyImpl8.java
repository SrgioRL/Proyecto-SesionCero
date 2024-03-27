package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Salvacion;
import sesioncero.repository.SalvacionRepository;

@Service

public class SalvacionServiceMyImpl8 implements SalvacionService{
	
	@Autowired
	private SalvacionRepository salvacionRepository;
	
	@Override
	public Salvacion findById(int idSalvacion) {
		return salvacionRepository.findById(idSalvacion).orElse(null);
	}

	@Override
	public List<Salvacion> findAll() {
		return salvacionRepository.findAll();
	}

	@Override
	public Salvacion insertOne(Salvacion salvacion) {
		return salvacionRepository.save(salvacion);
	}

	@Override
	public boolean deleteOne(int idSalvacion) {
		try {
			if (findById(idSalvacion) != null) {
				salvacionRepository.deleteById(idSalvacion);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Salvacion updateOne(Salvacion salvacion) {
        try {
			
			if (findById(salvacion.getIdSalvacion()) != null) {	
				return salvacionRepository.save(salvacion);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}


}
