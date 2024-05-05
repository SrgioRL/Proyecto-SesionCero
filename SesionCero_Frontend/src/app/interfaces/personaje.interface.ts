
import { Alineamiento } from "./alineamiento.service";
import { Ascendencia } from "./ascendencia.interface";
import { Clase } from "./clase.interface";
import { Jugador } from "./jugador.interface";

export interface Personaje {
    idPersonaje: number; 
    nombre: string;
    clase: Clase;
    ascendencia: Ascendencia;
    alineamiento: Alineamiento;
    jugador: Jugador;
    nivel: number ;
    ca: number;
    pg: number;
    percepcionPasiva: number;
    iniciativa: number;
    cronica: string;
}