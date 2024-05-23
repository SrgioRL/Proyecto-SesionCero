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

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/personaje")
public class PersonajeRestController {
    @Autowired
    private PersonajeService personajeService;

    @Autowired
    private JugadorService jugadorService;

    @PostMapping("/alta")
    public Personaje altaPersonaje(@RequestBody Personaje personaje) {
        System.out.println("Received Personaje: " + personaje);
        return personajeService.insertOne(personaje);
    }

    @DeleteMapping("/eliminar/{idPersonaje}")
    public String eliminarPersonaje(@PathVariable int idPersonaje) {
        if (personajeService.deleteOne(idPersonaje))
            return "Personaje eliminado correctamente";
        else
            return "Personaje no se ha podido eliminar";
    }

    @GetMapping("/uno/{idPersonaje}")
    public Personaje mostrarPersonaje(@PathVariable int idPersonaje) {
        return personajeService.findById(idPersonaje);
    }

    @PutMapping("/modificar")
    public Personaje modificarPersonaje(@RequestBody Personaje personaje) {
        return personajeService.updateOne(personaje);
    }

    @GetMapping("/todos")
    public List<Personaje> buscarPersonajes() {
        return personajeService.findAll();
    }

    @GetMapping("/{idJugador}/personajes")
    public List<Personaje> obtenerPersonajesPorIdJugador(@PathVariable int idJugador) {
        Jugador jugador = jugadorService.findById(idJugador);
        return personajeService.findPersonajeByJugador(jugador);
    }

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
