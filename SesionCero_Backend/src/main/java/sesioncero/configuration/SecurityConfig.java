package sesioncero.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuración de seguridad para la aplicación Spring.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Configura la cadena de filtros de seguridad para la aplicación.
     * Define las reglas de autorización y los filtros de seguridad a aplicar.
     *
     * @param http el objeto HttpSecurity para construir la configuración de seguridad
     * @return el objeto SecurityFilterChain construido
     * @throws Exception si ocurre un error en la configuración
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desactiva la protección CSRF
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/jugador/alta", "/jugador/login").permitAll() // Permite el acceso sin autenticación a estas rutas
                .requestMatchers("/jugador/eliminar/**", "/jugador/uno/**", "/jugador/modificar", "/jugador/todos").authenticated() // Requiere autenticación para estas rutas
                .anyRequest().authenticated() // Requiere autenticación para cualquier otra solicitud
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Utiliza sesiones sin estado
        
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Añade el filtro JWT antes del filtro de autenticación de usuario y contraseña
        return http.build();
    }

    /**
     * Bean para codificar contraseñas utilizando BCrypt.
     *
     * @return el codificador de contraseñas BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean para gestionar la autenticación.
     * Configura el AuthenticationManager con el servicio de detalles de usuario y el codificador de contraseñas.
     *
     * @param http el objeto HttpSecurity para construir la configuración de autenticación
     * @return el objeto AuthenticationManager construido
     * @throws Exception si ocurre un error en la configuración
     */
    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder()); // Configura el servicio de detalles de usuario y el codificador de contraseñas
        return auth.build();
    }
}
