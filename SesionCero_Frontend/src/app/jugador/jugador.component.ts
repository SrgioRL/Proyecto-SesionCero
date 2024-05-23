import { Component, OnInit } from '@angular/core';
import { Jugador } from '../interfaces/jugador.interface';
import { JugadorService } from '../services/jugador.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  jugadorActual!: Jugador;
  jugadores: Jugador[] = [];
  modificacionExitosa: boolean = false;
  borradoExitoso: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idJugador = +params.get('idJugador')!;
      if (idJugador) {
        this.obtenerJugador(idJugador);
      }
    });
  }

  agregarJugador() {
    if (this.jugadorActual) {
      this.jugadorService.altaJugador(this.jugadorActual).subscribe(
        jugador => {
          console.log("Jugador agregado:", jugador);
          this.buscarJugadores();
        },
        error => {
          console.error('Error al agregar jugador:', error);
        }
      );
    }//TODO: redireccionar a /personajes para mostrar la página en vacío
  }

  eliminarJugador(idJugador: number) {
    this.jugadorService.eliminarJugador(idJugador).subscribe(
      response => {
        console.log(response);
        this.buscarJugadores();
      },
      error => {
        console.error('Error al eliminar jugador:', error);
      }
    );
    this.borradoExitoso = true;
    setTimeout(() => {
      this.router.navigate(['/']); 
    }, 3000);  //TODO: mirar al hacer la navegación porque el login sale cortado
  }
  

  obtenerJugador(idJugador: number) {
    this.jugadorService.mostrarJugador(idJugador).subscribe(
      jugador => {
        console.log("Jugador obtenido:", jugador);
        this.jugadorActual = jugador;
      },
      error => {
        console.error('Error al obtener jugador:', error);
      }
    );
  }

  modificarJugador() {
    if (this.jugadorActual) {
      this.jugadorService.modificarJugador(this.jugadorActual).subscribe(
        jugador => {
          console.log("Jugador modificado:", jugador);
          this.buscarJugadores();
        },
        error => {
          console.error('Error al modificar jugador:', error);
        }
      );
    }
    this.modificacionExitosa = true;
  }

  buscarJugadores() {
    this.jugadorService.buscarJugadores().subscribe(
      jugadores => {
        console.log("Jugadores encontrados:", jugadores);
        this.jugadores = jugadores;
      },
      error => {
        console.error('Error al buscar jugadores:', error);
      }
    );
  }
}
