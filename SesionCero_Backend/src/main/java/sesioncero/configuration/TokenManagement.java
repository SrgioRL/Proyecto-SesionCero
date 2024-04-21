/*package sesioncero.configuration;

import java.io.IOException;
import java.util.Date;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/*@Configuration
public class TokenManagement {

	/*---------------GENERACIÓN DEL TOKEN---------------*/
	
/*	@Bean
	JwtTokenProvider jwtTokenProvider() {
		return new JwtTokenProvider();
	}
}

@Component
class JwtTokenProvider {

	private final String secretKey = "secretKey"; // TODO: HAY QUE OCULTAR ESTE VALOR EN EL APPLICATION PROPERTIES; QUE  NO SE NOS OLVIDE :) <3<3
	private final long expirationMs = 3600000; // TODO: HAY QUE OCULTAR ESTE VALOR EN EL APPLICATION PROPERTIES; QUE NO SE NOS OLVIDE :) <3<3

	public String createToken(String username) {
		Date now = new Date();
		Date validity = new Date(now.getTime() + expirationMs);

		return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(validity)
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}

/*---------------VALIDACIÓN DEL TOKEN---------------*/

	/*@Component
	public class JwtTokenFilter extends OncePerRequestFilter {

		@Autowired
		private JwtTokenProvider jwtTokenProvider;

		@Autowired
		private UserDetailsService userDetailsService;

		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
				FilterChain filterChain) throws ServletException, IOException {

			String token = getTokenFromRequest(request);
			if (token != null && jwtTokenProvider.validateToken(token)) {
				String username = jwtTokenProvider.getUsernameFromToken(token);

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				if (userDetails != null) {
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}

			filterChain.doFilter(request, response);
		}

		private String getTokenFromRequest(HttpServletRequest request) {
			String bearerToken = request.getHeader("Authorization");
			if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
				return bearerToken.substring(7);
			}
			return null;
		}
	}

	public boolean validateToken(String token) {
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

	public String getUsernameFromToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}
}*/
