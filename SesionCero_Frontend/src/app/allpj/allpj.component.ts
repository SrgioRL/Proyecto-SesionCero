import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/personaje.interface';
import { PersonajeService } from '../services/personaje.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-allpj',
  templateUrl: './allpj.component.html',
  styleUrls: ['./allpj.component.css'] 
})
export class AllpjComponent implements OnInit {
  
   public idJugador!: number; 
   public personajes: Personaje[] = [];

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJugador = +params['idJugador'];
      if (this.idJugador) {
        this.obtenerPersonajes();
      }
    });
  }

  obtenerPersonajes(): void {
    this.personajeService.obtenerPersonajesPorIdJugador(this.idJugador).subscribe(
      data => {
        // Filtrar los personajes por el ID del jugador
        this.personajes = data;
      },
      error => {
        console.error('Error al obtener personajes', error);
      }
    );
  }

  obtenerTodosLosPersonajes(): void {
    this.personajeService.buscarPersonajes().subscribe(
      data => {
        this.personajes = data;
      },
      error => {
        console.error('Error al obtener todos los personajes', error);
      }
    );
  }

  verDetalle(idPersonaje: number): void {
    this.router.navigate(['/personaje', idPersonaje]);
  }

  eliminarPersonaje(idPersonaje: number): void {
    this.personajeService.eliminarPersonaje(idPersonaje).subscribe(
      () => {
        console.log('Personaje eliminado correctamente.');
        this.obtenerPersonajes(); 
      },
      (error) => {
        console.error('Error al eliminar personaje:', error);
      }
    );
  }
}
