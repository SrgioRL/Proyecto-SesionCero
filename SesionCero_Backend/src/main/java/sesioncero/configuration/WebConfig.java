package sesioncero.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc // Esto es necesario solo si no estás utilizando Spring Boot por completo y deseas habilitar la configuración de MVC manualmente
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200") // Permite solicitudes desde el frontend Angular en localhost:4200
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Permite los métodos HTTP especificados
            .allowedHeaders("*"); // Permite todos los encabezados
    }
}
