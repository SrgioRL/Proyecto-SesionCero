import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  nombre: string;
  raza: string;
  clase: string;
  trasfondo: string;
  retrato: File | undefined;
  caracteristicas: string[] = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduria', 'Carisma'];
  valoresBase: { [key: string]: number } = {
    Fuerza: 10,
    Destreza: 10,
    Constitución: 10,
    Inteligencia: 10,
    Sabiduria: 10,
    Carisma: 10
  };

  constructor() {
    this.nombre = '';
    this.raza = '';
    this.clase = '';
    this.trasfondo = '';
    this.retrato = undefined;
  }
  onFileSelected(event: any) {
    this.retrato = event.target.files[0];
  }

  increaseModifier(caracteristica: string) {
    this.valoresBase[caracteristica]++;
  }

  decreaseModifier(caracteristica: string) {
    this.valoresBase[caracteristica]--;
  }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }
}
