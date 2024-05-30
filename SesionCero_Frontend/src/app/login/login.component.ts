import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista de inicio de sesión.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {AuthService} authService - Servicio para manejar la autenticación.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(private authService: AuthService, private router: Router) {}

  
  ngOnInit(): void {}

  /**
   * Maneja el proceso de inicio de sesión.
   *
   * Utiliza el servicio de autenticación para enviar las credenciales de inicio de sesión.
   * Si el inicio de sesión es correcto, redirige al usuario a la vista de todos sus personajes.
   * Si ocurre un error, muestra un mensaje de error.
   */
  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso, token:', response.token);
        this.router.navigate([`/todos/${response.idJugador}`]);
      },
      error: (err) => {
        console.error('Error en el login', err);
        this.errorMessage = 'Credenciales incorrectas';
      },
    });
  }

    /**
   * Navega a la página de inicio.
   *
   * Este método redirige al usuario a la página de inicio.
   */
    goHome() {
      this.router.navigate(['/']);
    }
}
