package sesioncero.restcontroller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa una solicitud de autenticación.
 * 
 * Contiene los campos necesarios para que un usuario se autentique:
 * - username: El nombre de usuario del jugador.
 * - password: La contraseña del jugador.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
	private String username;
	private String password;

}
