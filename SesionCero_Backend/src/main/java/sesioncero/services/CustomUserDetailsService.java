package sesioncero.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sesioncero.modelo.entities.Jugador;
import sesioncero.repository.JugadorRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private JugadorRepository jugadorRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Jugador jugador = jugadorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(jugador.getEmail())
                .password(jugador.getPassword())
                .authorities(new ArrayList<>())  
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
