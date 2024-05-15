package sesioncero.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import sesioncero.modelo.entities.Personaje;
import sesioncero.services.PersonajeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/personaje")

public class PersonajeRestController {
	

	@Autowired
	private PersonajeService personajeService;

	 // Método para agregar un nuevo personaje
    @PostMapping("/alta")
    public Personaje altaPersonaje(@RequestBody Personaje personaje) {
        return personajeService.insertOne(personaje);
    }

    // Método para eliminar un personaje por su ID
    @DeleteMapping("/eliminar/{idPersonaje}")
    public String eliminarPersonaje(@PathVariable int idPersonaje){
        if (personajeService.deleteOne(idPersonaje))
            return "Personaje eliminado correctamente";
        else
            return "Personaje no se ha podido eliminar";
    }

    // Método para obtener un personaje por su ID
    @GetMapping("/uno/{idPersonaje}")
    public Personaje mostrarPersonaje(@PathVariable int idPersonaje){
        return personajeService.findById(idPersonaje);

    }
    
    //Método para modificar un personaje
    @PutMapping ("/modificar")
    public Personaje modificarPersonaje(@RequestBody Personaje personaje) {
    	return personajeService.updateOne(personaje);
    }
    
    //Método para buscar todos los jugadores
    @GetMapping ("/todos")
    public List <Personaje> buscarPersonajes () {
    	return personajeService.findAll();
    }
    
}
