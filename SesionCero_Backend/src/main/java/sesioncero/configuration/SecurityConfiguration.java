/*
package sesioncero.configuration;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sesioncero.services.JugadorServiceMyImpl8;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JugadorServiceMyImpl8 jugadorServiceMyImpl8;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, ObjectProvider<JwtTokenFilter> jwtTokenFilterProvider) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/jugador/login", "/jugador/alta", "/personaje/alta").permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtTokenFilterProvider.getIfAvailable(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return jugadorServiceMyImpl8;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
*/
