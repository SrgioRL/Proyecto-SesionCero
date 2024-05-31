package sesioncero.configuration;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

/**
 * Utilidades para la gestión y validación de tokens JWT.
 */
@Component
public class JwtUtils {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private long expiration;

	/**
	 * Genera un token JWT para el nombre de usuario proporcionado.
	 *
	 * @param username el nombre de usuario para el cual se genera el token.
	 * @return el token JWT generado.
	 */
	public String generateToken(String username) {
		return Jwts.builder().setSubject(username).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	/**
	 * Valida un token JWT comparando el nombre de usuario y verificando su fecha de
	 * expiración.
	 *
	 * @param token    el token JWT a validar.
	 * @param username el nombre de usuario a comparar.
	 * @return true si el token es válido, false en caso contrario.
	 */
	/**
	 * Valida un token JWT comparando el nombre de usuario y verificando su fecha de
	 * expiración.
	 *
	 * @param token    el token JWT a validar.
	 * @param username el nombre de usuario a comparar.
	 * @return true si el token es válido, false en caso contrario.
	 */
	public Boolean validateToken(String token, String username) {
		try {
			final String usernameFromToken = getUsernameFromToken(token);
			return (usernameFromToken.equals(username) && !isTokenExpired(token));
		} catch (ExpiredJwtException e) {
			System.out.println("El token JWT ha expirado"); // Salta cuando el token ha expirado.
			return false;
		} catch (UnsupportedJwtException e) {
			System.out.println("Token JWT no soportado"); // Salta cuando el token no es compatible con el formato.
			return false;
		} catch (MalformedJwtException e) {
			System.out.println("Token JWT malformado"); // Salta cuando el token no está bien formado.
			return false;
		} catch (SignatureException e) {
			System.out.println("Firma JWT inválida"); // Salta cuando la firma del token no es válida.
			return false;
		} catch (IllegalArgumentException e) {
			System.out.println("La cadena de reclamaciones del JWT está vacía"); // Salta cuando la cadena de
																					// reclamaciones está vacía o nula.
			return false;
		}
	}

	/**
	 * Obtiene el nombre de usuario del token JWT.
	 *
	 * @param token el token JWT.
	 * @return el nombre de usuario extraído del token.
	 */
	public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}

	/**
	 * Obtiene la fecha de expiración del token JWT.
	 *
	 * @param token el token JWT.
	 * @return la fecha de expiración del token.
	 */
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	/**
	 * Obtiene un reclamo (claim) específico del token JWT utilizando un resolver de
	 * reclamos.
	 *
	 * @param token          el token JWT.
	 * @param claimsResolver una función para resolver el reclamo deseado.
	 * @param <T>            el tipo del reclamo.
	 * @return el reclamo extraído del token.
	 */
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	/**
	 * Obtiene todos los reclamos (claims) del token JWT. Los claims son piezas de
	 * información incluidas en el token JWT que describen información sobre el
	 * usuario y otras propiedades.
	 *
	 * @param token el token JWT.
	 * @return los reclamos del token.
	 */
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	/**
	 * Verifica si el token JWT ha expirado.
	 *
	 * @param token el token JWT.
	 * @return true si el token ha expirado, false en caso contrario.
	 */
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
}
