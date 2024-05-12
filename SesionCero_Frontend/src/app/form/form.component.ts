import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ascendencias } from '../dataConstants/ascendencias';
import { clases } from '../dataConstants/clases';
import { alineamientos } from '../dataConstants/alineamientos';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  ascendencias = ascendencias;
  clases = clases;
  alineamientos = alineamientos;
  caracteristicas = [
    { key: 'fuerza', label: 'Fuerza' },
    { key: 'destreza', label: 'Destreza' },
    { key: 'constitucion', label: 'Constitución' },
    { key: 'inteligencia', label: 'Inteligencia' },
    { key: 'sabiduria', label: 'Sabiduría' },
    { key: 'carisma', label: 'Carisma' },
  ];

  private basePG = 0;
  private modConstitucion = 0;
  private previousClassId = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [''],
      id_ascendencia: [''],
      id_clase: [''],
      id_alineamiento: [''],
      nivel: [1],
      pg: [''],
      fuerza: [10],
      destreza: [10],
      constitucion: [10],
      inteligencia: [10],
      sabiduria: [10],
      carisma: [10],
      cronica: [''],
    });
    this.setupFormSubscriptions();
  }
  ngOnInit(): void {}

  private setupFormSubscriptions(): void {
    this.form.get('id_clase')?.valueChanges.subscribe(() => {
      this.calculatePG();
    });
    this.form.get('constitucion')?.valueChanges.subscribe(() => {
      this.calculatePG();
    });
    this.calculatePG();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.form.patchValue({ retrato: file });
  }

  increaseModifier(caracteristica: string) {
    const value = this.form.get(caracteristica)?.value || 10;
    this.form.get(caracteristica)?.setValue(value + 1);
  }

  decreaseModifier(caracteristica: string) {
    const value = this.form.get(caracteristica)?.value || 10;
    if (value > 1) {
      this.form.get(caracteristica)?.setValue(value - 1);
    }
  }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }

  calculatePG(): void {
    const claseId = this.form.get('id_clase')?.value;
    const constitucion = this.form.get('constitucion')?.value;

    if (this.previousClassId !== claseId) {
      this.previousClassId = claseId;
      const claseSeleccionada = this.clases.find(
        (clase) => clase.id === +claseId
      );
      this.basePG = claseSeleccionada
        ? Math.floor(Math.random() * claseSeleccionada.dadoGolpe) + 1
        : 0;
    }

    this.modConstitucion = this.calcularModificador(constitucion);
    this.form.patchValue({ pg: this.basePG + this.modConstitucion });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
