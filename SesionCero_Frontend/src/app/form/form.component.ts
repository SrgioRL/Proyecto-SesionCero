import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ascendencias } from '../dataConstants/ascendencias';
import { clases } from '../dataConstants/clases';
import { alineamientos } from '../dataConstants/alineamientos';
import {
  habilidadesPorClase,
  todasLasHabilidades,
} from '../dataConstants/habilidadesPorClase';
import { PersonajeService } from '../services/personaje.service';
import { Personaje } from '../interfaces/personaje.interface';
import { HabilidadService } from '../services/habilidad.service';
import { Router } from '@angular/router';

/**
 * Este es el componente encargado de manejar la vista para crear o editar personajes.
 */
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

  /**
   * Lista de características del personaje
   */
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

  /**
   * El constructor del componente. Aquí se inyectan las dependencias necesarias.
   *
   * @param {FormBuilder} fb - Para construir y gestionar el formulario reactivo.
   * @param {PersonajeService} personajeService - Servicio para manejar los datos de los personajes.
   * @param {HabilidadService} habilidadService - Servicio para manejar las habilidades de los personajes.
   * @param {Router} router - Para navegar entre diferentes vistas.
   */
  constructor(
    private fb: FormBuilder,
    private personajeService: PersonajeService,
    private habilidadService: HabilidadService,
    private router: Router
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

  /**
   * Método que se ejecuta al iniciar el componente.
   *
   * Configura los listeners del formulario y actualiza los campos calculados.
   */
  ngOnInit(): void {
    this.configurarListenersFormulario();
    this.actualizarCamposCalculados();
  }

  /**
   * Configura los listeners del formulario para actualizar campos calculados y habilidades cuando cambian los valores.
   *
   * Este método agrega suscripciones a los cambios de valores en los campos del formulario. Cuando los valores de
   * `id_clase`, `constitucion`, `destreza` o `sabiduria` cambian, se laman métodos para recalcular y
   * actualizar los valores en el formulario.
   *
   * - Al cambiar `id_clase`, se actualizan los campos calculados y se asignan las habilidades por clase.
   * - Al cambiar `constitucion`, se recalculan los puntos de golpe (PG).
   * - Al cambiar `destreza`, se recalculan la clase de armadura (CA) y la iniciativa.
   * - Al cambiar `sabiduria`, se recalcula la percepción pasiva.
   */
  private configurarListenersFormulario(): void {
    this.formulario.get('id_clase')?.valueChanges.subscribe(() => {
      this.actualizarCamposCalculados();
      this.asignarHabilidadesPorClase();
    });
    this.formulario
      .get('constitucion')
      ?.valueChanges.subscribe(() => this.calcularPG());
    this.formulario.get('destreza')?.valueChanges.subscribe(() => {
      this.calcularCA();
      this.actualizarIniciativa();
    });
    this.formulario
      .get('sabiduria')
      ?.valueChanges.subscribe(() => this.actualizarPercepcion());
  }

  /**
   * Actualiza todos los campos calculados del formulario.
   *
   * Este método llama a otros métodos (`calcularPG`, `calcularCA`, `actualizarIniciativa`, `actualizarPercepcion`)
   * para recalcular y actualizar los valores dependientes de otras características del personaje en el formulario.
   */
  private actualizarCamposCalculados(): void {
    this.calcularPG();
    this.calcularCA();
    this.actualizarIniciativa();
    this.actualizarPercepcion();
  }

  /**
   * Maneja la selección de un archivo de imagen, convirtiéndolo a base64 y actualizando el formulario.
   *
   * Este método se activa cuando un archivo de imagen es seleccionado por el usuario.
   * Toma el archivo seleccionado, lo convierte a formato base64 utilizando el método `convertirImagenABase64`,
   * y actualiza el campo `retrato` del formulario con el valor en base64.
   *
   * @param {any} event - El evento de selección de archivo.
   */
  archivoSeleccionado(event: any): void {
    const archivo = event.target.files[0];
    this.convertirImagenABase64(archivo).then(
      (base64: string | ArrayBuffer | null) => {
        this.formulario.patchValue({ retrato: base64 });
      }
    );
  }

  /**
   * Convierte un archivo de imagen a formato base64 para poder almacenarlo y utilizarlo en el formulario.
   *
   * Este método utiliza un `FileReader` para leer el contenido del archivo de imagen y convertirlo
   * a una cadena en formato base64. Retorna una promesa que se resuelve con la imagen en formato base64
   * o se rechaza en caso de error.
   *
   * @param {File} archivo - El archivo de imagen a convertir.
   * @returns {Promise<string | ArrayBuffer | null>} - Una promesa que resuelve con la imagen en formato base64.
   */

  private convertirImagenABase64(
    archivo: File
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resolve(lector.result);
      lector.onerror = (error) => reject(error);
    });
  }

  /**
   * Aumenta el valor de una característica del personaje en 1.
   *
   * @param {string} caracteristica - La característica cuyo valor se va a aumentar.
   */
  aumentarModificador(caracteristica: string) {
    this.cambiarValorCaracteristica(caracteristica, 1);
  }

  /**
   * Disminuye el valor de una característica del personaje en 1.
   *
   * @param {string} caracteristica - La característica cuyo valor se va a disminuir.
   */
  disminuirModificador(caracteristica: string) {
    this.cambiarValorCaracteristica(caracteristica, -1);
  }

  /**
   * Cambia el valor de una característica del personaje.
   *
   * Este método obtiene el valor actual de una característica del formulario y lo ajusta
   * sumándole o restándole la cantidad `cambio`. Si el nuevo valor está
   * dentro del rango permitido (1 a 20), actualiza el formulario con el nuevo valor.
   *
   * @param {string} caracteristica - La característica cuyo valor se va a cambiar.
   * @param {number} cambio - La cantidad de cambio (positivo o negativo).
   */

  private cambiarValorCaracteristica(caracteristica: string, cambio: number) {
    const valor = this.formulario.get(caracteristica)?.value || 10;
    const nuevoValor = valor + cambio;
    if (nuevoValor >= 1 && nuevoValor <= 20) {
      this.formulario.get(caracteristica)?.setValue(nuevoValor);
    }
  }

  /**
   * Calcula el modificador de una característica según su valor.
   *
   * Este método toma el valor de una característica y calcula su modificador
   * utilizando la fórmula (valor - 10) / 2 y redondeando hacia abajo.
   *
   * @param {number} valor - El valor de la característica.
   * @returns {number} - El modificador calculado.
   */

  public calcularModificador(valor: number): number {
    return Math.floor((valor - 10) / 2);
  }

  /**
   * Calcula los puntos de golpe (PG) del personaje en función de su clase y constitución.
   *
   * Este método primero obtiene el valor de la clase y la constitución del formulario. Si la clase ha cambiado,
   * actualiza la base de los PG utilizando el método `obtenerValorBaseClase`. Luego, calcula el modificador de constitución
   * y ajusta los PG del personaje en el formulario sumando la base de los PG con el modificador de constitución.
   */

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

  /**
   * Calcula la clase de armadura (CA) del personaje en función de su clase y destreza.
   *
   * Este método primero obtiene el valor de la clase y la destreza del formulario. Si la clase ha cambiado,
   * actualiza la base de la CA utilizando el método `obtenerValorBaseClase`. Luego, calcula el modificador de destreza
   * y ajusta la CA del personaje en el formulario sumando la base de la CA con el modificador de destreza.
   */
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

  /**
   * Obtiene el valor base de una característica de la clase seleccionada.
   *
   * Este método busca la clase correspondiente al `claseId` proporcionado y obtiene
   * el valor base de la característica especificada por la `key`. Si la clase se encuentra
   * y el valor de la característica es un número, se devuelve un valor aleatorio basado en
   * ese número. Si no se encuentra la clase o la característica no es un número, se devuelve 0.
   *
   * @param {number} claseId - El ID de la clase.
   * @param {string} key - La clave del valor que se desea obtener.
   * @returns {number} - El valor base de la característica.
   */
  private obtenerValorBaseClase(claseId: number, key: string): number {
    const claseSeleccionada = this.clases.find(
      (clase) => clase.id === +claseId
    );

    if (
      claseSeleccionada &&
      typeof claseSeleccionada[key as keyof typeof claseSeleccionada] ===
        'number'
    ) {
      return (
        Math.floor(
          Math.random() *
            (claseSeleccionada[key as keyof typeof claseSeleccionada] as number)
        ) + 1
      );
    }
    return 0;
  }

  /**
   * Actualiza la iniciativa del personaje en función de su modificador de destreza.
   *
   * Este método calcula el modificador de destreza del personaje basado en el valor
   * actual de destreza en el formulario. Luego, actualiza el campo de iniciativa
   * en el formulario con el modificador de destreza calculado.
   */
  private actualizarIniciativa(): void {
    const modDestreza = this.calcularModificador(
      this.formulario.get('destreza')?.value
    );
    this.formulario.patchValue({ iniciativa: modDestreza });
  }

  /**
   * Actualiza la percepción pasiva del personaje en función de su modificador de sabiduría.
   *
   * Este método calcula el modificador de sabiduría del personaje basado en el valor
   * actual de sabiduría en el formulario. Luego, actualiza el campo de percepción
   * pasiva en el formulario sumando 10 al modificador de sabiduría calculado.
   */
  private actualizarPercepcion(): void {
    const modSabiduria = this.calcularModificador(
      this.formulario.get('sabiduria')?.value
    );
    this.formulario.patchValue({ percepcionPasiva: 10 + modSabiduria });
  }

  /**
   * Asigna las habilidades fijas según la clase seleccionada.
   *
   * Este método obtiene las habilidades fijas correspondientes a la clase seleccionada
   * en el formulario. Luego, actualiza el formulario con estas habilidades, las guarda
   * en la lista de habilidades fijas seleccionadas y las establece en el servicio de habilidades.
   * También resetea las habilidades adicionales seleccionadas.
   */
  private asignarHabilidadesPorClase(): void {
    const claseId = this.formulario.get('id_clase')?.value;
    const habilidadesClase = this.obtenerHabilidadesClase(claseId);
    this.habilidadesFijasSeleccionadas = habilidadesClase;
    this.establecerArrayHabilidades('habilidadesFijas', habilidadesClase);
    this.habilidadService.setHabilidadesFijas(habilidadesClase);
    this.resetHabilidadesAdicionales();
  }

  /**
   * Obtiene las habilidades de una clase específica.
   *
   * Este método busca la clase correspondiente al `claseId` proporcionado
   * y devuelve una lista de habilidades asociadas con esa clase. Si la clase
   * no se encuentra o no tiene habilidades asociadas, retorna una lista vacía.
   *
   * @param {number} claseId - El ID de la clase.
   * @returns {string[]} - Una lista de habilidades de la clase.
   */
  private obtenerHabilidadesClase(claseId: number): string[] {
    const claseSeleccionada = this.clases.find(
      (clase) => clase.id === +claseId
    );
    return claseSeleccionada
      ? this.habilidadesPorClase[
          claseSeleccionada.name as keyof typeof habilidadesPorClase
        ] || []
      : [];
  }

  /**
   * Establece un array de habilidades en el formulario.
   *
   * @param {string} nombreArray - El nombre del array en el formulario.
   * @param {string[]} habilidades - La lista de habilidades a establecer.
   */
  private establecerArrayHabilidades(
    nombreArray: string,
    habilidades: string[]
  ): void {
    const arrayForm = this.formulario.get(nombreArray) as FormArray;
    arrayForm.clear();
    habilidades.forEach((habilidad) =>
      arrayForm.push(this.fb.control(habilidad))
    );
  }

  /**
   * Resetea las habilidades adicionales seleccionadas para que el usuario pueda elegir otras.
   */
  private resetHabilidadesAdicionales(): void {
    const arrayHabilidadesAdicionales = this.formulario.get(
      'habilidadesAdicionales'
    ) as FormArray;
    arrayHabilidadesAdicionales.clear();
  }

  /**
   * Alterna la selección de una habilidad adicional.
   *
   * Si la habilidad ya está seleccionada, la elimina de la lista. Si no está seleccionada y
   * hay menos de 2 habilidades adicionales seleccionadas, la agrega a la lista. Luego,
   * actualiza el servicio de habilidades con las habilidades adicionales seleccionadas.
   *
   * @param {string} habilidad - La habilidad a alternar.
   */
  alternarHabilidadAdicional(habilidad: string): void {
    const arrayHabilidadesAdicionales = this.formulario.get(
      'habilidadesAdicionales'
    ) as FormArray;
    const index = arrayHabilidadesAdicionales.controls.findIndex(
      (control) => control.value === habilidad
    );
    if (index !== -1) {
      arrayHabilidadesAdicionales.removeAt(index);
    } else if (arrayHabilidadesAdicionales.length < 2) {
      arrayHabilidadesAdicionales.push(this.fb.control(habilidad));
    }
    this.habilidadService.setHabilidadesAdicionales(
      arrayHabilidadesAdicionales.value
    );
  }

  /**
   * Verifica si una habilidad adicional está deshabilitada.
   *
   * Una habilidad adicional está deshabilitada si ya hay 2 habilidades seleccionadas y esta no está seleccionada.
   *
   * @param {string} habilidad - La habilidad a verificar.
   * @returns {boolean} - `true` si la habilidad está deshabilitada, `false` en caso contrario.
   */
  isHabilidadAdicionalDeshabilitada(habilidad: string): boolean {
    const arrayHabilidadesAdicionales = this.formulario.get(
      'habilidadesAdicionales'
    ) as FormArray;
    return (
      arrayHabilidadesAdicionales.length >= 2 &&
      !arrayHabilidadesAdicionales.value.includes(habilidad)
    );
  }

  /**
   * Verifica si una habilidad es fija.
   *
   * @param {string} habilidad - La habilidad a verificar.
   * @returns {boolean} - `true` si la habilidad es fija, `false` en caso contrario.
   */
  isHabilidadFija(habilidad: string): boolean {
    return this.habilidadesFijasSeleccionadas.includes(habilidad);
  }

  /**
   * Prepara los datos del personaje para ser enviados al servidor.
   *
   * Este método recoge los valores actuales del formulario, calcula los modificadores
   * de las características y construye un objeto `Personaje` con toda la información
   * necesaria para crear el personaje.
   *
   * @returns {Personaje} - Los datos del personaje.
   */
  private prepararPersonaje(): Personaje {
    const valores = this.formulario.value;
    return {
      idPersonaje: 0,
      nombre: valores.nombre,
      clase: { idClase: valores.id_clase, nombre: valores.nombre },
      ascendencia: {
        idAscendencia: valores.id_ascendencia,
        nombre: valores.nombre,
      },
      alineamiento: {
        idAlineamiento: valores.id_alineamiento,
        nombre: valores.nombre,
      },
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

  /**
   * Envía los datos del formulario al servidor para crear o actualizar un personaje.
   *
   * Este método se llama cuando el formulario se envía. Primero, verifica si el formulario es válido.
   * Si es válido, prepara los datos del personaje utilizando el método `prepararPersonaje` y llama al servicio `PersonajeService`
   * para enviar estos datos al servidor. Si la creación se completa, redirige a la página de detalles del personaje.
   * Si ocurre un error, se muestra un mensaje de error en la consola.
   *
   * Si el formulario no es válido, marca todos los campos como tocados para que se muestren los mensajes de error
   * correspondientes y muestra en la consola que el formulario no es válido.
   */
  onSubmit(): void {
    if (this.formulario.valid) {
      const personaje = this.prepararPersonaje();
      this.personajeService.altaPersonaje(personaje).subscribe(
        (response) => {
          console.log('Personaje creado con éxito', response);
          this.router.navigate(['/personaje/idJugador']);
        },
        (error) => console.error('Error al crear el personaje', error)
      );
    } else {
      this.formulario.markAllAsTouched();
      console.log('El formulario no es válido');
    }
  }

  /**
   * Verifica si un campo del formulario es inválido si no cumple con las validaciones marcadas en el formulario.
   * Además, este método verifica si el campo ha sido modificado (`dirty`) o si ha sido tocado (`touched`).
   *
   * @param {string} campo - El nombre del campo a verificar.
   * @returns {boolean} - `true` si el campo es inválido y ha sido modificado o tocado, `false` en caso contrario.
   */
  campoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  /**
   * Guarda las habilidades seleccionadas en el servicio de habilidades.
   */
  guardarHabilidadesSeleccionadas(): void {
    const habilidadesFijasSeleccionadas =
      this.formulario.get('habilidadesFijas')?.value;
    const habilidadesAdicionalesSeleccionadas = this.formulario.get(
      'habilidadesAdicionales'
    )?.value;
    this.habilidadService.setHabilidadesPorPersonaje({
      fijas: habilidadesFijasSeleccionadas,
      adicionales: habilidadesAdicionalesSeleccionadas,
    });
  }
}
