package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Alineamiento;
import sesioncero.repository.AlineamientoRepository;

@Service
public class AlineamientoServiceMyImpl8 implements AlineamientoService {

	@Autowired
	private AlineamientoRepository alineamientoRepository;
	
	@Override
	public Alineamiento findById(int idAlineamiento) {
		return alineamientoRepository.findById(idAlineamiento).orElse(null);
	}

	@Override
	public List<Alineamiento> findAll() {
		return alineamientoRepository.findAll();
	}

	@Override
	public Alineamiento insertOne(Alineamiento alineamiento) {
		return alineamientoRepository.save(alineamiento);
	}

	@Override
	public boolean deleteOne(int idAlineamiento) {
		try {
			if (findById(idAlineamiento) != null) {
				alineamientoRepository.deleteById(idAlineamiento);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Alineamiento updateOne(Alineamiento alineamiento) {
        try {
			
			if (findById(alineamiento.getIdAlineamiento()) != null) {	
				return alineamientoRepository.save(alineamiento);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}
}

