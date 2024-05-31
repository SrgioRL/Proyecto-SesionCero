package sesioncero.configuration;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro para la validación del token JWT en cada solicitud HTTP. Este filtro
 * se ejecuta una vez por cada petición y verifica la validez del token JWT.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserDetailsService userDetailsService;

	/**
	 * Método que filtra cada solicitud HTTP para verificar el token JWT y
	 * autenticar al usuario si el token es válido.
	 *
	 * @param request  la solicitud HTTP entrante
	 * @param response la respuesta HTTP saliente
	 * @param chain    el filtro de la cadena que permite la continuación de la
	 *                 solicitud
	 * @throws ServletException si ocurre un error en el procesamiento del servlet
	 * @throws IOException      si ocurre un error de entrada/salida
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		// Obtiene el encabezado de autorización de la solicitud HTTP
		final String requestTokenHeader = request.getHeader("Authorization");

		String username = null;
		String jwtToken = null;

		/**
		 * Extrae el token JWT del encabezado de autorización si este comienza con la
		 * cadena "Bearer ". Si el encabezado no está presente o no comienza con "Bearer
		 * ", se informa en la consola.
		 */
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			try {
				// Obtiene el nombre de usuario del token JWT
				username = jwtUtils.getUsernameFromToken(jwtToken);
			} catch (IllegalArgumentException e) {
				// Excepción lanzada si no se puede obtener el token JWT
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				// Excepción lanzada si el token JWT ha expirado
				System.out.println("JWT Token has expired");
			}
		} else if (requestTokenHeader != null) {
			// Informa si el token JWT no comienza con "Bearer "
			System.out.println("JWT Token does not begin with Bearer String");
		}

		/**
		 * Si se obtiene un nombre de usuario del token JWT y no hay una autenticación
		 * previa, carga los detalles del usuario y valida el token. Si el token es
		 * válido, se configura la autenticación.
		 */
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
			if (jwtUtils.validateToken(jwtToken, userDetails.getUsername())) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		// Continúa con el siguiente filtro en la cadena
		chain.doFilter(request, response);
	}
}
