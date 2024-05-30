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

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtils.generateToken(userDetails.getUsername());

            // Obtener el jugador por email
            Jugador jugador = jugadorService.findByEmail(authRequest.getUsername()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
  
            return ResponseEntity.ok(new AuthResponse(jwt, jugador.getIdJugador()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    @PostMapping("/alta")
    public Jugador registerUser(@RequestBody Jugador jugador) {
        jugador.setPassword(new BCryptPasswordEncoder().encode(jugador.getPassword()));
        return jugadorService.insertOne(jugador);
    }
}
