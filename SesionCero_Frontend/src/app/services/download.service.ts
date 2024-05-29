import { Injectable } from '@angular/core';

/**
 * Este es un servicio para descargar archivos.
 * 
 * La anotación @Injectable indica que este servicio se puede inyectar en cualquier parte
 * de la aplicación. Al poner providedIn: 'root', Angular se encarga de crear una única instancia
 * de este servicio que se puede usar en toda la app.
 */
@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  /**
   * Este método permite descargar un archivo.
   * 
   * @param {string} filePath - La URL o la ruta donde se encuentra el archivo que queremos descargar.
   * @param {string} fileName - El nombre que queremos darle al archivo cuando lo guardemos en nuestra computadora.
   * 
   * - Creamos un elemento <a> (un enlace) usando `document.createElement('a')`.
   * - Le asignamos la URL del archivo a `link.href`.
   * - Le decimos cómo queremos que se llame el archivo descargado con `link.download`.
   * - Finalmente, simulamos un clic en ese enlace con `link.click()` para que el navegador comience la descarga.
   */
  downloadFile(filePath: string, fileName: string) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
  }
}

