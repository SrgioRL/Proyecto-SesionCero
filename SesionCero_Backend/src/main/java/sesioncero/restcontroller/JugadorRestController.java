package sesioncero.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import sesioncero.configuration.JwtTokenProvider;
import sesioncero.dto.LoginDTO;
import sesioncero.modelo.entities.Jugador;
import sesioncero.services.JugadorService;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Permitir solicitudes desde el frontend
@RequestMapping("/jugador")
public class JugadorRestController {

    @Autowired
    private JugadorService jugadorService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Método para el login
    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            Jugador jugador = (Jugador) authentication.getPrincipal();
            return jwtTokenProvider.createToken(jugador.getEmail());
        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciales erróneas");
        }
    }
    // Método para agregar un nuevo jugador
    @PostMapping("/alta")
    public Jugador altaJugador(@RequestBody Jugador jugador) {
        return jugadorService.insertOne(jugador);
    }

    // Método para eliminar un jugador por su ID
    @DeleteMapping("/eliminar/{idJugador}")
    public String eliminarJugador(@PathVariable int idJugador) {
        if (jugadorService.deleteOne(idJugador))
            return "Jugador eliminado correctamente";
        else
            return "Jugador no se ha podido eliminar";
    }

    // Método para obtener un jugador por su ID
    @GetMapping("/uno/{idJugador}")
    public Jugador mostrarJugador(@PathVariable int idJugador) {
        return jugadorService.findById(idJugador);
    }

    // Método para modificar un jugador
    @PutMapping("/modificar")
    public Jugador modificarJugador(@RequestBody Jugador jugador) {
        return jugadorService.updateOne(jugador);
    }

    // Método para buscar todos los jugadores
    @GetMapping("/todos")
    public List<Jugador> buscarJugadores() {
        return jugadorService.findAll();
    }
}
