import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { JugadorService } from '../services/jugador.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit {
  personajes: Personaje[] = [];
  personaje: Personaje | undefined;
  public idPersonaje: number | undefined;
  public retratoUrl: any

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private http: HttpClient 
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

  obtenerRetrato() {
    console.log('Retrato',this.retratoUrl)
    if (this.idPersonaje) {
      console.log('Retrato',this.retratoUrl)
      this.personajeService.obtenerRetrato(this.idPersonaje).subscribe(
        (data: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.retratoUrl = reader.result as string;
          };
          reader.readAsDataURL(data);
        },
        (error) => {
          console.error('Error al obtener el retrato del personaje:', error);
        }
      );
    }
  }
  

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
