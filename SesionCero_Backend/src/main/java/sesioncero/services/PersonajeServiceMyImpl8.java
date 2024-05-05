package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Ascendencia;
import sesioncero.modelo.entities.Caracteristica;
import sesioncero.modelo.entities.Personaje;
import sesioncero.repository.AscendenciaRepository;
import sesioncero.repository.CaracteristicaRepository;
import sesioncero.repository.PersonajeRepository;

@Service

public class PersonajeServiceMyImpl8 implements PersonajeService {

	@Autowired
	private PersonajeRepository personajeRepository;
	@Autowired
	private CaracteristicaRepository caracteristicaRepository;
	
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
	

	
	//ASIGNAR VALOR DE CARACTERÍSTICA SEGÚN DESCENDENCIA
	 public void incrementarCaracteristicas(int idPersonaje) {
	    Personaje personaje = personajeRepository.findById(idPersonaje).orElse(null);
	    if (personaje == null) {
	        // Manejo del caso en que el personaje no se encuentre en la base de datos
	        return; // Por ejemplo, podrías lanzar una excepción o simplemente retornar si no puedes manejar la situación
	    }

	    Ascendencia ascendencia = personaje.getAscendencia();
	    if (ascendencia == null) {
	        // Manejo del caso en que la ascendencia no esté definida para el personaje
	        return; // O maneja este caso de alguna otra manera
	    }
	    List<Caracteristica> caracteristicas = caracteristicaRepository.obtenerCaracteristicasDePersonaje(idPersonaje);
	    for (Caracteristica caracteristica : caracteristicas) {
	    	
	        // Establecer el valor inicial de cada característica en 10
	        caracteristica.setFuerza(10);
	        caracteristica.setDestreza(10);
	        caracteristica.setConstitucion(10);
	        caracteristica.setInteligencia(10);
	        caracteristica.setSabiduria(10);
	        caracteristica.setCarisma(10);

	        // Aplicar las bonificaciones según la ascendencia
	        switch (ascendencia.getNombre()) {
	            case "Enano":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Mediano":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Gnomo":
	                caracteristica.setInteligencia(caracteristica.getInteligencia() + 2);
	                break;
	            case "Elfo":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Humano":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 1);
	                caracteristica.setDestreza(caracteristica.getDestreza() + 1);
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 1);
	                caracteristica.setInteligencia(caracteristica.getInteligencia() + 1);
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 1);
	                caracteristica.setCarisma(caracteristica.getCarisma() + 1);
	                break;
	            case "Dracónico":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                break;
	            case "Tiefling":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            case "Semiorco":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 1);
	                break;
	            case "Semielfo":
	                // Asumiendo que se asignan los puntos extra a dos características a elección
	                // En este caso, se incrementan destreza e inteligencia
	                caracteristica.setDestreza(caracteristica.getDestreza() + 1);
	                caracteristica.setInteligencia(caracteristica.getInteligencia() + 1);
	                break;
	            case "Arakocra":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Aasimar":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            case "Genasí de aire":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Genasí de tierra":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Genasí de fuego":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Genasí de agua":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Centauro":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 1);
	                break;
	            case "Bugbear":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                caracteristica.setDestreza(caracteristica.getDestreza() + 1);
	                break;
	            case "Changeling":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            case "Gnomo de las profundidades":
	                caracteristica.setInteligencia(caracteristica.getInteligencia() + 2);
	                break;
	            case "Duergar":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Eladrin":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Hada":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 1);
	                break;
	            case "Firbolg":
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 2);
	                break;
	            case "Githyanki":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                break;
	            case "Githzerai":
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 2);
	                break;
	            case "Goblin":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Goliat":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                break;
	            case "Harengon":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Hobgoblin":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Kenku":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 1);
	                break;
	            case "Kobold":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Lizardfolk":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Minotauro":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 1);
	                break;
	            case "Orco":
	                caracteristica.setFuerza(caracteristica.getFuerza() + 2);
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 1);
	                break;
	            case "Sátiro":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            case "Elfo marino":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Shadar Kai":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                break;
	            case "Cambiaformas":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            case "Tabaxi":
	                caracteristica.setDestreza(caracteristica.getDestreza() + 2);
	                caracteristica.setCarisma(caracteristica.getCarisma() + 1);
	                break;
	            case "Tortuga":
	                caracteristica.setConstitucion(caracteristica.getConstitucion() + 2);
	                break;
	            case "Tritón":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 1);
	                caracteristica.setSabiduria(caracteristica.getSabiduria() + 1);
	                break;
	            case "Yuan-ti":
	                caracteristica.setCarisma(caracteristica.getCarisma() + 2);
	                break;
	            default:
	                // Manejo del caso en que la ascendencia no esté definida
	                break;
	        }
	    }
      
        // Guardar los cambios en la base de datos
        caracteristicaRepository.saveAll(caracteristicas);
    }

}
