import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent  {
  personaje: Personaje | undefined;

  constructor(
    private route: ActivatedRoute,
    private personajeService: PersonajeService
  ) {}

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.personajeService.getPersonajeById(id).subscribe(data => {
  //       this.personaje = data;
  //     });
  //   }
  // }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
