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
import org.springframework.web.bind.annotation.RestController;

import sesioncero.modelo.entities.Jugador;
import sesioncero.services.JugadorService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/jugador")

public class JugadorRestController {
	
	@Autowired
	private JugadorService jugadorService;
	
	 // Método para agregar un nuevo jugador
    @PostMapping("/alta")
    public Jugador altaJugador(@RequestBody Jugador jugador) {
        return jugadorService.insertOne(jugador);
    }

    // Método para eliminar un jugador por su ID
    @DeleteMapping("/eliminar/{idJugador}")
    public String eliminarJugador(@PathVariable int idJugador){
        if (jugadorService.deleteOne(idJugador))
            return "Jugador eliminado correctamente";
        else
            return "Jugador no se ha podido eliminar";
    }

    // Método para obtener un jugador por su ID
    @GetMapping("/uno/{idJugador}")
    public Jugador mostrarJugador(@PathVariable int idJugador){
        return jugadorService.findById(idJugador);

    }
    
    //Método para modificar un jugador
    @PutMapping ("/modificar")
    public Jugador modificarJugador (@RequestBody Jugador jugador) {
    	return jugadorService.updateOne(jugador);
    }
    
    //Método para buscar todos los jugadores
    @GetMapping ("/todos")
    public List <Jugador> buscarJugadores () {
    	return jugadorService.findAll();
    }

}
