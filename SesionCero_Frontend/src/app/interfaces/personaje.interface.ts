
import { Alineamiento } from "./alineamiento.interface";
import { Ascendencia } from "./ascendencia.interface";
import { Clase } from "./clase.interface";
import { Jugador } from "./jugador.interface";

export interface Personaje {
    idPersonaje: number;
    nombre: string;
    clase: { idClase: number };
    ascendencia: { idAscendencia: number };
    alineamiento: { idAlineamiento: number };
    nivel: number;
    ca: number;
    pg: number;
    percepcionPasiva: number;
    iniciativa: number;
    fuerza: number;
    fuerzaMod: number;
    destreza: number;
    destrezaMod: number;
    constitucion: number;
    constitucionMod: number;
    inteligencia: number;
    inteligenciaMod: number;
    sabiduria: number;
    sabiduriaMod: number;
    carisma: number;
    carismaMod: number;
    cronica: string;
    retrato: string | null;
    jugador: any; // Ajusta según tu necesidad
  }
  
