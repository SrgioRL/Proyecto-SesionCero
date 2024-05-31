package sesioncero.restcontroller;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sesioncero.modelo.entities.Jugador;
import sesioncero.modelo.entities.Personaje;
import sesioncero.services.JugadorService;
import sesioncero.services.PersonajeService;

/**
 * Controlador REST para gestionar los personajes.
 * 
 * Este controlador maneja las solicitudes relacionadas con las operaciones CRUD de los personajes y sus retratos.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/personaje")
public class PersonajeRestController {

    @Autowired
    private PersonajeService personajeService;

    @Autowired
    private JugadorService jugadorService;

    /**
     * Da de alta un nuevo personaje.
     * 
     * @param personaje el objeto Personaje a ser creado.
     * @return el personaje creado.
     */
    @PostMapping("/alta")
    public Personaje altaPersonaje(@RequestBody Personaje personaje) {
        System.out.println("Received Personaje: " + personaje);
        return personajeService.insertOne(personaje);
    }

    /**
     * Elimina un personaje por su ID.
     * 
     * @param idPersonaje el ID del personaje a eliminar.
     * @return un mensaje indicando si el personaje fue eliminado correctamente o no.
     */
    @DeleteMapping("/eliminar/{idPersonaje}")
    public String eliminarPersonaje(@PathVariable int idPersonaje) {
        if (personajeService.deleteOne(idPersonaje))
            return "Personaje eliminado correctamente";
        else
            return "Personaje no se ha podido eliminar";
    }

    /**
     * Muestra la información de un personaje por su ID.
     * 
     * @param idPersonaje el ID del personaje a mostrar.
     * @return el personaje con el ID especificado.
     */
    @GetMapping("/uno/{idPersonaje}")
    public Personaje mostrarPersonaje(@PathVariable int idPersonaje) {
        return personajeService.findById(idPersonaje);
    }

    /**
     * Modifica la información de un personaje.
     * 
     * @param personaje el objeto Personaje con la información actualizada.
     * @return el personaje modificado.
     */
    @PutMapping("/modificar")
    public Personaje modificarPersonaje(@RequestBody Personaje personaje) {
        return personajeService.updateOne(personaje);
    }

    /**
     * Busca y devuelve todos los personajes.
     * 
     * @return una lista con todos los personajes.
     */
    @GetMapping("/todos")
    public List<Personaje> buscarPersonajes() {
        return personajeService.findAll();
    }

    /**
     * Obtiene todos los personajes de un jugador específico por su ID.
     * 
     * @param idJugador el ID del jugador.
     * @return una lista de personajes asociados al jugador especificado.
     */
    @GetMapping("/{idJugador}/personajes")
    public List<Personaje> obtenerPersonajesPorIdJugador(@PathVariable int idJugador) {
        Jugador jugador = jugadorService.findById(idJugador);
        return personajeService.findPersonajeByJugador(jugador);
    }

    /**
     * Obtiene el retrato de un personaje por su ID.
     * 
     * @param idPersonaje el ID del personaje.
     * @return una respuesta con la imagen del retrato en formato JPEG o un estado 404 si el personaje no se encuentra.
     */
    @GetMapping("/{idPersonaje}/retrato")
    public ResponseEntity<byte[]> getRetrato(@PathVariable int idPersonaje) {
        Optional<Personaje> personajeOptional = Optional.ofNullable(personajeService.findById(idPersonaje));
        if (personajeOptional.isPresent()) {
            Personaje personaje = personajeOptional.get();
            // Codificar la cadena de caracteres en Base64
            byte[] retratoBytes = Base64.getDecoder().decode(personaje.getRetrato());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(retratoBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
	