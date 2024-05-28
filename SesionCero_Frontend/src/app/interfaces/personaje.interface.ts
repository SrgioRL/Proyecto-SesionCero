export interface Personaje {
    idPersonaje: number;
    nombre: string;
    clase: { idClase: number, nombre: string };
    ascendencia: { idAscendencia: number, nombre: string};
    alineamiento: { idAlineamiento: number, nombre: string };
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
  
