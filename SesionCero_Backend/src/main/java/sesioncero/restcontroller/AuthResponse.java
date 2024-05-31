package sesioncero.restcontroller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa una respuesta de autenticación.
 * 
 * Contiene los campos devueltos al usuario tras una autenticación exitosa:
 * - token: El token JWT generado.
 * - idJugador: El identificador del jugador.
 * - nombre: El nombre del jugador.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private int idJugador;
    private String nombre;
}
