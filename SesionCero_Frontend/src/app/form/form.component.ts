import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ascendencias } from '../dataConstants/ascendencias';
import { clases } from '../dataConstants/clases';
import { alineamientos } from '../dataConstants/alineamientos';
import { habilidadesPorClase, todasLasHabilidades } from '../dataConstants/habilidadesPorClase';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formulario: FormGroup;
  ascendencias = ascendencias;
  clases = clases;
  alineamientos = alineamientos;
  habilidadesPorClase = habilidadesPorClase;
  todasLasHabilidades = todasLasHabilidades;
  habilidadesFijasSeleccionadas: string[] = [];

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

  constructor(
    private fb: FormBuilder,
    private personajeService: PersonajeService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      id_ascendencia: ['', Validators.required],
      id_clase: ['', Validators.required],
      id_alineamiento: ['', Validators.required],
      nivel: [1],
      pg: [''],
      ca: [''],
      percepcionPasiva: [10],
      iniciativa: [''],
      fuerza: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      destreza: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      constitucion: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      inteligencia: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      sabiduria: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      carisma: [
        10,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      cronica: [''],
      habilidadesFijas: this.fb.array([]),
      habilidadesAdicionales: this.fb.array([]),
      retrato: [null],
    });
  }

  ngOnInit(): void {
    this.configurarListenersFormulario();
    this.actualizarCamposCalculados();
  }

  private configurarListenersFormulario(): void {
    this.formulario.get('id_clase')?.valueChanges.subscribe(() => {
      this.actualizarCamposCalculados();
      this.asignarHabilidadesPorClase();
    });
    this.formulario.get('constitucion')?.valueChanges.subscribe(() => this.calcularPG());
    this.formulario.get('destreza')?.valueChanges.subscribe(() => {
      this.calcularCA();
      this.actualizarIniciativa();
    });
    this.formulario.get('sabiduria')?.valueChanges.subscribe(() => this.actualizarPercepcion());
  }

  private actualizarCamposCalculados(): void {
    this.calcularPG();
    this.calcularCA();
    this.actualizarIniciativa();
    this.actualizarPercepcion();
  }

  archivoSeleccionado(event: any): void {
    const archivo = event.target.files[0];
    this.convertirImagenABase64(archivo).then((base64: string | ArrayBuffer | null) => {
      this.formulario.patchValue({ retrato: base64 });
    });
  }

  private convertirImagenABase64(archivo: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resolve(lector.result);
      lector.onerror = (error) => reject(error);
    });
  }

  aumentarModificador(caracteristica: string) {
    this.cambiarValorCaracteristica(caracteristica, 1);
  }

  disminuirModificador(caracteristica: string) {
    this.cambiarValorCaracteristica(caracteristica, -1);
  }

  private cambiarValorCaracteristica(caracteristica: string, cambio: number) {
    const valor = this.formulario.get(caracteristica)?.value || 10;
    const nuevoValor = valor + cambio;
    if (nuevoValor >= 1 && nuevoValor <= 20) {
      this.formulario.get(caracteristica)?.setValue(nuevoValor);
    }
  }

  public calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }

  private calcularPG(): void {
    const claseId = this.formulario.get('id_clase')?.value;
    const constitucion = this.formulario.get('constitucion')?.value;

    if (this.idClaseAnteriorPG !== claseId) {
      this.idClaseAnteriorPG = claseId;
      this.basePG = this.obtenerValorBaseClase(claseId, 'dadoGolpe');
    }

    this.modConstitucion = this.calcularModificador(constitucion);
    this.formulario.patchValue({ pg: this.basePG + this.modConstitucion });
  }

  private calcularCA(): void {
    const claseId = this.formulario.get('id_clase')?.value;
    const destreza = this.formulario.get('destreza')?.value;

    if (this.idClaseAnteriorCA !== claseId) {
      this.idClaseAnteriorCA = claseId;
      this.baseCA = this.obtenerValorBaseClase(claseId, 'dadoGolpe');
    }

    this.modDestreza = this.calcularModificador(destreza);
    this.formulario.patchValue({ ca: this.baseCA + this.modDestreza });
  }

  private obtenerValorBaseClase(claseId: number, key: string): number {
    const claseSeleccionada = this.clases.find(clase => clase.id === +claseId);
    
    if (claseSeleccionada && typeof claseSeleccionada[key as keyof typeof claseSeleccionada] === 'number') {
      return Math.floor(Math.random() * (claseSeleccionada[key as keyof typeof claseSeleccionada] as number)) + 1;
    }
    return 0;
  }

  private actualizarIniciativa(): void {
    const modDestreza = this.calcularModificador(this.formulario.get('destreza')?.value);
    this.formulario.patchValue({ iniciativa: modDestreza });
  }

  private actualizarPercepcion(): void {
    const modSabiduria = this.calcularModificador(this.formulario.get('sabiduria')?.value);
    this.formulario.patchValue({ percepcionPasiva: 10 + modSabiduria });
  }

  private asignarHabilidadesPorClase(): void {
    const claseId = this.formulario.get('id_clase')?.value;
    const habilidadesClase = this.obtenerHabilidadesClase(claseId);
    this.habilidadesFijasSeleccionadas = habilidadesClase; // Guardar habilidades fijas seleccionadas
    this.establecerArrayHabilidades('habilidadesFijas', habilidadesClase);
    this.resetHabilidadesAdicionales(); // Resetear habilidades adicionales seleccionadas
  }

  private obtenerHabilidadesClase(claseId: number): string[] {
    const claseSeleccionada = this.clases.find(clase => clase.id === +claseId);
    return claseSeleccionada ? (this.habilidadesPorClase[claseSeleccionada.name as keyof typeof habilidadesPorClase] || []) : [];
  }

  private establecerArrayHabilidades(nombreArray: string, habilidades: string[]): void {
    const arrayForm = this.formulario.get(nombreArray) as FormArray;
    arrayForm.clear();
    habilidades.forEach(habilidad => arrayForm.push(this.fb.control(habilidad)));
  }

  private resetHabilidadesAdicionales(): void {
    const arrayHabilidadesAdicionales = this.formulario.get('habilidadesAdicionales') as FormArray;
    arrayHabilidadesAdicionales.clear();
  }

  alternarHabilidadAdicional(habilidad: string): void {
    const arrayHabilidadesAdicionales = this.formulario.get('habilidadesAdicionales') as FormArray;
    const index = arrayHabilidadesAdicionales.controls.findIndex(control => control.value === habilidad);
    if (index !== -1) {
      arrayHabilidadesAdicionales.removeAt(index);
    } else if (arrayHabilidadesAdicionales.length < 2) {
      arrayHabilidadesAdicionales.push(this.fb.control(habilidad));
    }
  }

  isHabilidadAdicionalDeshabilitada(habilidad: string): boolean {
    const arrayHabilidadesAdicionales = this.formulario.get('habilidadesAdicionales') as FormArray;
    return arrayHabilidadesAdicionales.length >= 2 && !arrayHabilidadesAdicionales.value.includes(habilidad);
  }

  isHabilidadFija(habilidad: string): boolean {
    return this.habilidadesFijasSeleccionadas.includes(habilidad);
  }

  private prepararPersonaje(): Personaje {
    const valores = this.formulario.value;
    return {
      idPersonaje: 0,
      nombre: valores.nombre,
      clase: { idClase: valores.id_clase },
      ascendencia: { idAscendencia: valores.id_ascendencia },
      alineamiento: { idAlineamiento: valores.id_alineamiento },
      nivel: valores.nivel,
      ca: valores.ca,
      pg: valores.pg,
      percepcionPasiva: valores.percepcionPasiva,
      iniciativa: valores.iniciativa,
      fuerza: valores.fuerza,
      fuerzaMod: this.calcularModificador(valores.fuerza),
      destreza: valores.destreza,
      destrezaMod: this.calcularModificador(valores.destreza),
      constitucion: valores.constitucion,
      constitucionMod: this.calcularModificador(valores.constitucion),
      inteligencia: valores.inteligencia,
      inteligenciaMod: this.calcularModificador(valores.inteligencia),
      sabiduria: valores.sabiduria,
      sabiduriaMod: this.calcularModificador(valores.sabiduria),
      carisma: valores.carisma,
      carismaMod: this.calcularModificador(valores.carisma),
      cronica: valores.cronica,
      retrato: valores.retrato,
      jugador: null,
    };
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const personaje = this.prepararPersonaje();
      this.personajeService.altaPersonaje(personaje).subscribe(
        response => console.log('Personaje creado con éxito', response),
        error => console.error('Error al crear el personaje', error)
      );
    } else {
      this.formulario.markAllAsTouched();
      console.log('El formulario no es válido');
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
