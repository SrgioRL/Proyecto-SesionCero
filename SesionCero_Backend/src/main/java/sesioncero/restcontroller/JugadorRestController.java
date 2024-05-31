package sesioncero.restcontroller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sesioncero.modelo.entities.Jugador;
import sesioncero.services.JugadorService;

/**
 * Controlador REST para gestionar los jugadores.
 * 
 * Este controlador maneja las solicitudes relacionadas con las operaciones CRUD de los jugadores.
 */
@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/jugador")
public class JugadorRestController {

    @Autowired
    private JugadorService jugadorService;

    /**
     * Elimina un jugador por su ID.
     * 
     * @param idJugador el ID del jugador a eliminar.
     * @return un mensaje indicando si el jugador fue eliminado correctamente o no.
     */
    @DeleteMapping("/eliminar/{idJugador}")
    public String eliminarJugador(@PathVariable int idJugador) {
        if (jugadorService.deleteOne(idJugador))
            return "Jugador eliminado correctamente";
        else
            return "Jugador no se ha podido eliminar";
    }

    /**
     * Muestra la información de un jugador por su ID.
     * 
     * @param idJugador el ID del jugador a mostrar.
     * @return el jugador con el ID especificado.
     */
    @GetMapping("/uno/{idJugador}")
    public Jugador mostrarJugador(@PathVariable int idJugador) {
        return jugadorService.findById(idJugador);
    }

    /**
     * Modifica la información de un jugador.
     * 
     * @param jugador el objeto Jugador con la información actualizada.
     * @return el jugador modificado.
     */
    @PutMapping("/modificar")
    public Jugador modificarJugador(@RequestBody Jugador jugador) {
        return jugadorService.updateOne(jugador);
    }

    /**
     * Busca y devuelve todos los jugadores.
     * 
     * @return una lista con todos los jugadores.
     */
    @GetMapping("/todos")
    public List<Jugador> buscarJugadores() {
        return jugadorService.findAll();
    }
}
