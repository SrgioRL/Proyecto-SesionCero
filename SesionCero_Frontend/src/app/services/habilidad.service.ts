import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  private habilidadesFijasSource = new BehaviorSubject<string[]>([]);
  private habilidadesAdicionalesSource = new BehaviorSubject<string[]>([]);
  private habilidadesPorPersonajeSource = new BehaviorSubject<{ fijas: string[], adicionales: string[] }>({ fijas: [], adicionales: [] });

  habilidadesFijas$ = this.habilidadesFijasSource.asObservable();
  habilidadesAdicionales$ = this.habilidadesAdicionalesSource.asObservable();
  habilidadesPorPersonaje$ = this.habilidadesPorPersonajeSource.asObservable();

  setHabilidadesFijas(habilidades: string[]) {
    this.habilidadesFijasSource.next(habilidades);
  }

  setHabilidadesAdicionales(habilidades: string[]) {
    this.habilidadesAdicionalesSource.next(habilidades);
  }

  setHabilidadesPorPersonaje(habilidades: { fijas: string[], adicionales: string[] }) {
    this.habilidadesPorPersonajeSource.next(habilidades);
  }
}
