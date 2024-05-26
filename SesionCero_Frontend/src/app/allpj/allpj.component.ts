import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/personaje.interface';
import { PersonajeService } from '../services/personaje.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allpj',
  templateUrl: './allpj.component.html',
  styleUrls: ['./allpj.component.css'] 
})
export class AllpjComponent implements OnInit {
  
  public idJugador: number | null = null; 
  public personajes: Personaje[] = [];

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJugador = +params['idJugador'] || null;
      if (this.idJugador) {
        this.obtenerPersonajes();
      } else {
        this.obtenerTodosLosPersonajes();
      }
    });
  }

  obtenerPersonajes(): void {
    this.personajeService.obtenerPersonajesPorIdJugador(this.idJugador!).subscribe(
      data => {
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
        this.idJugador ? this.obtenerPersonajes() : this.obtenerTodosLosPersonajes(); 
      },
      (error) => {
        console.error('Error al eliminar personaje:', error);
      }
    );
  }
}
