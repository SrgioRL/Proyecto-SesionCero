import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { JugadorService } from '../services/jugador.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit {
  personajes: Personaje[] = [];
  personaje: Personaje | undefined;
  public idPersonaje: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPersonaje = +params['idPersonaje'];
      if (this.idPersonaje) {
        this.personajeService.mostrarPersonaje(this.idPersonaje).subscribe(
          (data: Personaje) => {
            this.personaje = data;
          },
          (error) => {
            console.error('Error al obtener los detalles del personaje:', error);
          }
        );
      }
    });
  }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
