//package sesioncero.configuration;

//import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// import sesioncero.configuration.JwtTokenProvider.JwtTokenFilter;

/**
 * Configuración de seguridad para la aplicación, utilizando Spring Security.
 */
/*@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

// 	@Autowired
// 	private JwtTokenFilter jwtTokenFilter;

// 	// TODO: HAY QUE AÑADIR O MODIFICAR LAS RUTAS CONFORME SE VAYAN HACIENDO, ESTO
// 	// ES SOLO EL ESQUELETO :) <3<3

	/**
	 * Configura la cadena de filtros de seguridad que gestiona la autenticación y autorización.
	 * 
	 * @param http Objeto HttpSecurity para configurar la seguridad web.
	 * @return SecurityFilterChain La cadena de filtros de seguridad configurada.
	 * @throws Exception Si ocurre un error en la configuración de seguridad.
	 */
	//@Bean
	/*SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						authz -> authz.requestMatchers("/auth/**").permitAll().anyRequest().authenticated())
				.formLogin(form -> form.loginPage("/login").defaultSuccessUrl("/home", true).permitAll())
				.logout(logout -> logout.logoutUrl("/logout").logoutSuccessUrl("/login").permitAll())
				.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

// 		return http.build();
// 	}

	/**
	 * Bean para la codificación de contraseñas usando BCrypt.
	 * 
	 * @return BCryptPasswordEncoder Un codificador de contraseñas BCrypt.
	 */
	//@Bean
	/*BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
*/
