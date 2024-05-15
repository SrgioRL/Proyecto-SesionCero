import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  private idClaseAnteriorPG = 0;
  private baseCA = 0;
  private modDestreza = 0;
  private idClaseAnteriorCA = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      id_ascendencia: ['', Validators.required],
      id_clase: ['', Validators.required],
      id_alineamiento: ['', Validators.required],
      nivel: [1],
      pg: [''],
      ca: [''],
      percepcionPasiva: [10],
      iniciativa: [''],
      fuerza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      destreza: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      constitucion: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      inteligencia: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      sabiduria: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      carisma: [10, [Validators.required, Validators.min(1), Validators.max(20)]],
      cronica: [''],
    });
    this.suscripcionesFormulario();
  }

  ngOnInit(): void {}

  private suscripcionesFormulario(): void {
    this.form.get('id_clase')?.valueChanges.subscribe(() => {
      this.calcularPG();
      this.calcularCA();
    });
    this.form.get('constitucion')?.valueChanges.subscribe(() => {
      this.calcularPG();
    });
    this.form.get('destreza')?.valueChanges.subscribe(() => {
      this.calcularCA();
      this.modIniciativa();
    });
    this.form.get('sabiduria')?.valueChanges.subscribe(() => {
      this.modPercepcion();
    });
    this.calcularPG();
    this.calcularCA();
    this.modIniciativa();
    this.modPercepcion();
  }

  archivoSeleccionado(event: any): void {
    const file = event.target.files[0];
    this.form.patchValue({ retrato: file });
  }

  aumentarModificador(caracteristica: string) {
    const value = this.form.get(caracteristica)?.value || 10;
    this.form.get(caracteristica)?.setValue(value + 1);
  }

  disminuirModificador(caracteristica: string) {
    const value = this.form.get(caracteristica)?.value || 10;
    if (value > 1) {
      this.form.get(caracteristica)?.setValue(value - 1);
    }
  }

  calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }

  calcularPG(): void {
    const claseId = this.form.get('id_clase')?.value;
    const constitucion = this.form.get('constitucion')?.value;

    if (this.idClaseAnteriorPG !== claseId) {
      this.idClaseAnteriorPG = claseId;
      const claseSeleccionada = this.clases.find(clase => clase.id === +claseId);
      this.basePG = claseSeleccionada ? Math.floor(Math.random() * claseSeleccionada.dadoGolpe) + 1 : 0;
    }

    this.modConstitucion = this.calcularModificador(constitucion);
    this.form.patchValue({ pg: this.basePG + this.modConstitucion });
  }

  calcularCA(): void {
    const claseId = this.form.get('id_clase')?.value;
    const destreza = this.form.get('destreza')?.value;

    if (this.idClaseAnteriorCA !== claseId) {
      this.idClaseAnteriorCA = claseId;
      const claseSeleccionada = this.clases.find(clase => clase.id === +claseId);
      this.baseCA = claseSeleccionada ? Math.floor(Math.random() * claseSeleccionada.dadoGolpe) + 1 : 0;
    }

    this.modDestreza = this.calcularModificador(destreza);
    this.form.patchValue({ ca: this.baseCA + this.modDestreza });
  }

  modIniciativa(): void {
    const destrezaMod = this.calcularModificador(this.form.get('destreza')?.value);
    this.form.patchValue({ iniciativa: destrezaMod });
  }

  modPercepcion(): void {
    const sabiduriaMod = this.calcularModificador(this.form.get('sabiduria')?.value);
    this.form.patchValue({ percepcionPasiva: 10 + sabiduriaMod });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes manejar el envío de datos al backend
    } else {
      this.form.markAllAsTouched();  // Marca todos los campos como tocados para mostrar mensajes de error
      console.log('El formulario no es válido');
    }
  }

  campoInvalido(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
