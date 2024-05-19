package sesioncero.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sesioncero.modelo.entities.Jugador;
import sesioncero.repository.JugadorRepository;

@Service
public class JugadorServiceMyImpl8 implements JugadorService, UserDetailsService {

    @Autowired
    private JugadorRepository jugadorRepository;

    @Override
    public Jugador findById(int idJugador) {
        return jugadorRepository.findById(idJugador).orElse(null);
    }

    @Override
    public List<Jugador> findAll() {
        return jugadorRepository.findAll();
    }

    @Override
    public Jugador insertOne(Jugador jugador) {
        return jugadorRepository.save(jugador);
    }

    @Override
    public boolean deleteOne(int idJugador) {
        try {
            if (findById(idJugador) != null) {
                jugadorRepository.deleteById(idJugador);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Jugador updateOne(Jugador jugador) {
        try {
            if (findById(jugador.getIdJugador()) != null) {
                return jugadorRepository.save(jugador);
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Jugador jugador = jugadorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User
                .withUsername(jugador.getEmail())
                .password(jugador.getPassword())
                .authorities("USER") // Define los roles o autoridades
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
