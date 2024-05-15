package sesioncero.configuration;

/*import java.io.IOException;
import java.util.Date;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.stereotype.Component;

// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;*/

/**<<<<<<< HEAD

 * Clase de configuración que define beans para el manejo de JWT.
 */
//@Configuration
//public class TokenManagement {

// 	/*---------------GENERACIÓN DEL TOKEN---------------*/

	/**
	 * Bean que proporciona una instancia de JwtTokenProvider.
	 * 
	 * @return JwtTokenProvider una instancia del proveedor de token.
	 */
	//@Bean
//=======
/*@Configuration
public class TokenManagement {

// 	/*---------------GENERACIÓN DEL TOKEN---------------*/
	
// /*	@Bean
// >>>>>>> 10d4fa061efb8bc87ccee757ce23216f27b623b3
// 	JwtTokenProvider jwtTokenProvider() {
// 		return new JwtTokenProvider();
// 	}
// }

/**
 * Componente que provee la funcionalidad para la creación y validación de JWT.
 */
/*@Component
class JwtTokenProvider {

// 	private final String secretKey = "secretKey"; // TODO: HAY QUE OCULTAR ESTE VALOR EN EL APPLICATION PROPERTIES; QUE
// 													// NO SE NOS OLVIDE :) <3<3
// 	private final long expirationMs = 3600000; // TODO: HAY QUE OCULTAR ESTE VALOR EN EL APPLICATION PROPERTIES; QUE NO
// 												// SE NOS OLVIDE :) <3<3

	/**
	 * Crea un token JWT para un usuario especificado.
	 * 
	 * @param username El nombre de usuario para el cual se crea el token.
	 * @return String El token JWT generado.
	 */
	/*public String createToken(String username) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + expirationMs);

// 		return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(validity)
// 				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
// 	}

// 	/*---------------VALIDACIÓN DEL TOKEN---------------*/

/*<<<<<<< HEAD
	/**
	 * Filtro que se ejecuta en cada solicitud HTTP para autenticar usuarios mediante JWT. 
	 * Este filtro verifica la presencia de un token JWT en la cabecera "Authorization". 
	 * Si el token es válido: 
	 * 1. Extrae el nombre de usuario del token. 
	 * 2. Carga y verifica los detalles del usuario mediante UserDetailsService. 
	 * 3. Configura el contexto de seguridad con la autenticación del usuario, permitiendo que la solicitud proceda. 
	 *
	 * @param request     La solicitud HTTP entrante.
	 * @param response    La respuesta HTTP.
	 * @param filterChain La cadena de filtros de seguridad.
	 * @throws ServletException Si ocurre un error al procesar la solicitud.
	 * 
	 */
	/*@Component
=======
	/*@Component
>>>>>>> 10d4fa061efb8bc87ccee757ce23216f27b623b3
	public class JwtTokenFilter extends OncePerRequestFilter {

// 		@Autowired
// 		private JwtTokenProvider jwtTokenProvider;

// 		@Autowired
// 		private UserDetailsService userDetailsService;

// 		@Override
// 		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
// 				FilterChain filterChain) throws ServletException, IOException {

// 			String token = getTokenFromRequest(request);
// 			if (token != null && jwtTokenProvider.validateToken(token)) {
// 				String username = jwtTokenProvider.getUsernameFromToken(token);

// 				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
// 				if (userDetails != null) {
// 					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
// 							userDetails, null, userDetails.getAuthorities());
// 					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
// 					SecurityContextHolder.getContext().setAuthentication(authentication);
// 				}
// 			}

// 			filterChain.doFilter(request, response);
// 		}

		/**
		 * Extrae el token JWT de la cabecera Authorization del request HTTP.
		 * 
		 * @param request El request HTTP desde el cual extraer el token.
		 * @return String El token JWT o null si no se encuentra.
		 */
		/*private String getTokenFromRequest(HttpServletRequest request) {
			String bearerToken = request.getHeader("Authorization");
			if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
				return bearerToken.substring(7);
			}
			return null;
		}
	}

	/**
	 * Valida un token JWT.
	 * 
	 * @param token El token JWT a validar.
	 * @return boolean true si el token es válido, false en caso contrario.
	 */
	/*public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return true;
		} catch (SignatureException ex) {
			System.out.println("Invalid JWT signature");
		} catch (MalformedJwtException ex) {
			System.out.println("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			System.out.println("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			System.out.println("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			System.out.println("JWT claims string is empty.");
		}
		return false;
	}

	/**
	 * Obtiene el nombre de usuario del token JWT.
	 * 
	 * @param token El token JWT del que se quiere obtener el nombre de usuario.
	 * @return String El nombre de usuario contenido en el token.
	 */
	/*public String getUsernameFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}
}*/
