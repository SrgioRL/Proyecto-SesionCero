
package sesioncero.restcontroller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sesioncero.modelo.entities.Jugador;
import sesioncero.services.JugadorService;


@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/jugador")
public class JugadorRestController {

	@Autowired
	private JugadorService jugadorService;

	

	@DeleteMapping("/eliminar/{idJugador}")
	public String eliminarJugador(@PathVariable int idJugador) {
		if (jugadorService.deleteOne(idJugador))
			return "Jugador eliminado correctamente";
		else
			return "Jugador no se ha podido eliminar";
	}

	@GetMapping("/uno/{idJugador}")
	public Jugador mostrarJugador(@PathVariable int idJugador) {
		return jugadorService.findById(idJugador);
	}

	@PutMapping("/modificar")
	public Jugador modificarJugador(@RequestBody Jugador jugador) {
		return jugadorService.updateOne(jugador);
	}

	@GetMapping("/todos")
	public List<Jugador> buscarJugadores() {
		return jugadorService.findAll();
	}
}
