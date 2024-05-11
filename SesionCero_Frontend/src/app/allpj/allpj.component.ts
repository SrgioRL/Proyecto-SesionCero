import { Component } from '@angular/core';
import { Personaje } from '../interfaces/personaje.interface';
import { PersonajeService } from '../services/personaje.service';

@Component({
  selector: 'app-allpj',
  templateUrl: './allpj.component.html',
  styleUrl: './allpj.component.css'
})
export class AllpjComponent {
  personajes: Personaje[] = [];

  constructor(private personajeService: PersonajeService) { }

  ngOnInit(): void {
    this.buscarPersonajes();
  }

  buscarPersonajes(): void {
    this.personajeService.buscarPersonajes().subscribe(
      (personajes: Personaje[]) => {
        this.personajes = personajes;
      },
      (error) => {
        console.error('Error al buscar personajes:', error);
      }
    );
  }

  eliminarPersonaje(idPersonaje: number): void {
    this.personajeService.eliminarPersonaje(idPersonaje).subscribe(
      () => {
        console.log('Personaje eliminado correctamente.');
        // Actualizar la lista de personajes después de eliminar
        this.buscarPersonajes();
      },
      (error) => {
        console.error('Error al eliminar personaje:', error);
      }
    );
  }
}
