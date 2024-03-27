package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Personaje;
import sesioncero.repository.PersonajeRepository;

@Service

public class PersonajeServiceMyImpl8 implements PersonajeService {

	@Autowired
	private PersonajeRepository personajeRepository;
	
	@Override
	public Personaje findById(int idPersonaje) {
		return personajeRepository.findById(idPersonaje).orElse(null);
	}

	@Override
	public List<Personaje> findAll() {
		return personajeRepository.findAll();
	}

	@Override
	public Personaje insertOne(Personaje personaje) {
		return personajeRepository.save(personaje);
	}

	@Override
	public boolean deleteOne(int idPersonaje) {
		try {
			if (findById(idPersonaje) != null) {
				personajeRepository.deleteById(idPersonaje);
				return true;
			}else
				return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Personaje updateOne(Personaje personaje) {
        try {
			
			if (findById(personaje.getIdPersonaje()) != null) {	
				return personajeRepository.save(personaje);
			}
			else {
				return null;
			}
			
		} catch (Exception e) {
			
			return null;
		}
	}

}
