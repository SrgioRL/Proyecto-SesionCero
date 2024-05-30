import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  private habilidadesFijasSource = new BehaviorSubject<string[]>([]);
  private habilidadesAdicionalesSource = new BehaviorSubject<string[]>([]);
  private habilidadesPorPersonajeSource = new BehaviorSubject<{ fijas: string[], adicionales: string[] }>({ fijas: [], adicionales: [] });
  private habilidadesSeleccionadasSource = new BehaviorSubject<string[]>([]);

  habilidadesFijas$ = this.habilidadesFijasSource.asObservable();
  habilidadesAdicionales$ = this.habilidadesAdicionalesSource.asObservable();
  habilidadesPorPersonaje$ = this.habilidadesPorPersonajeSource.asObservable();
  habilidadesSeleccionadas$ = this.habilidadesSeleccionadasSource.asObservable();

  setHabilidadesFijas(habilidades: string[]) {
    this.habilidadesFijasSource.next(habilidades);
  }

  setHabilidadesAdicionales(habilidades: string[]) {
    this.habilidadesAdicionalesSource.next(habilidades);
  }

  setHabilidadesSeleccionadas(habilidades: string[]) {
    this.habilidadesSeleccionadasSource.next(habilidades);
  }

  setHabilidadesPorPersonaje(habilidades: { fijas: string[], adicionales: string[] }) {
    this.habilidadesPorPersonajeSource.next(habilidades);
  }
}
