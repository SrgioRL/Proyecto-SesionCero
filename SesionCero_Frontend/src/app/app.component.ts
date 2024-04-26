import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dndFront';

  constructor(private router: Router) {}

  //verificar si la ruta actual es la página de login:
  isLoginPage(): boolean {
    return this.router.url === '/';
    }

    isTodosPage(): boolean {
      return this.router.url === '/todos';
    }
}
