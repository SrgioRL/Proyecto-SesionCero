import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (token) => {
        console.log('Login exitoso, token:', token);
        this.router.navigate(['/jugador']); 
      },
      error: (err) => {
        console.error('Error en el login', err);
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}
