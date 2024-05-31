package sesioncero.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sesioncero.configuration.JwtUtils;
import sesioncero.modelo.entities.Jugador;
import sesioncero.services.JugadorService;

/**
 * Controlador REST para la autenticación y el registro de jugadores.
 *
 * Este controlador maneja las solicitudes relacionadas con la autenticación de
 * jugadores y el registro de nuevos jugadores.
 * 
 * Anotaciones utilizadas: - @RestController: Indica que esta clase es un
 * controlador REST. - @CrossOrigin(origins = "*"): Permite solicitudes CORS
 * desde cualquier origen. - @RequestMapping("/jugador"): Define la ruta base
 * para este controlador.
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/jugador")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private JugadorService jugadorService;

	/**
	 * Autentica a un jugador y genera un token JWT si las credenciales son
	 * correctas.
	 *
	 * @param authRequest el objeto AuthRequest que contiene el nombre de usuario y
	 *                    la contraseña.
	 * @return ResponseEntity con el token JWT y los detalles del jugador, o un
	 *         mensaje de error si las credenciales son incorrectas.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
		try {
			// Autentica al usuario utilizando el AuthenticationManager y las credenciales
			// proporcionadas
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

			// Obtiene los detalles del usuario autenticado
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			// Genera un token JWT utilizando el nombre de usuario del usuario autenticado
			String jwt = jwtUtils.generateToken(userDetails.getUsername());

			// Busca al jugador en la base de datos utilizando el nombre de usuario
			// proporcionado
			Jugador jugador = jugadorService.findByEmail(authRequest.getUsername())
					.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

			// Devuelve una respuesta con el token JWT y los detalles del jugador
			return ResponseEntity.ok(new AuthResponse(jwt, jugador.getIdJugador(), jugador.getNombre()));
		} catch (AuthenticationException e) {
			// Devuelve una respuesta de error con el estado "No autorizado" si la
			// autenticación falla
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
		}
	}

	/**
	 * Registra un nuevo jugador en el sistema.
	 *
	 * @param jugador el objeto Jugador que contiene los datos del nuevo jugador.
	 * @return el objeto Jugador registrado.
	 */
	@PostMapping("/alta")
	public Jugador registerUser(@RequestBody Jugador jugador) {
		jugador.setPassword(new BCryptPasswordEncoder().encode(jugador.getPassword()));
		return jugadorService.insertOne(jugador);
	}
}
