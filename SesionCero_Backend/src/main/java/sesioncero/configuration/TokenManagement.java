package sesioncero.configuration;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class TokenManagement {

    @Bean
    public JwtTokenProvider jwtTokenProvider() {
        return new JwtTokenProvider();
    }

    @Bean
    public JwtTokenFilter jwtTokenFilter(JwtTokenProvider jwtTokenProvider, ObjectProvider<UserDetailsService> userDetailsServiceProvider) {
        return new JwtTokenFilter(jwtTokenProvider, userDetailsServiceProvider);
    }
}
