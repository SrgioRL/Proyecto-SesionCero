import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { JugadorService } from '../services/jugador.service';
import { HttpClient } from '@angular/common/http';
import { HabilidadService } from '../services/habilidad.service';


@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit {
  public personajes: Personaje[] = [];
  public personaje: Personaje | undefined;
  public idPersonaje: number | undefined;
  public retratoUrl: any
  public habilidadesFijas: string[] = [];
  public habilidadesAdicionales: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService,
    private http: HttpClient ,
    private router: Router,
    private habilidadService: HabilidadService
  ) { }

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
    this.habilidadService.habilidadesPorPersonaje$.subscribe((habilidades) => {
      this.habilidadesFijas = habilidades.fijas;
      this.habilidadesAdicionales = habilidades.adicionales;
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
  
  crearPersonaje() {
    this.router.navigate(['/crear']);
  }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
