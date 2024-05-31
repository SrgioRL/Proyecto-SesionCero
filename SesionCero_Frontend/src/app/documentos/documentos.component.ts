import { Component } from '@angular/core';
import { DownloadService } from '../services/download.service';

/**
 * Este es el componente encargado de manejar la vista de los documentos disponibles para descargar.
 */
@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent {
  /**
   * Lista de documentos esenciales con sus imágenes y rutas de PDF.
   */
  esenciales = [
    {
      img: 'assets/docsimg/01esenciales/01jugador.jpg',
      pdf: 'assets/docs/01esenciales/01jugador.pdf',
    },
    {
      img: 'assets/docsimg/01esenciales/02master.jpg',
      pdf: 'assets/docs/01esenciales/02master.pdf',
    },
    {
      img: 'assets/docsimg/01esenciales/03monstruos.jpg',
      pdf: 'assets/docs/01esenciales/03monstruos.pdf',
    },
    {
      img: 'assets/docsimg/01esenciales/04hojapersonaje.jpg',
      pdf: 'assets/docs/01esenciales/04hojapersonaje.pdf',
    },
  ];

  /**
   * Lista de documentos complementarios con sus imágenes y rutas de PDF.
   */
  complementos = [
    {
      img: 'assets/docsimg/02complementos/01tasha.jpg',
      pdf: 'assets/docs/02complementos/01tasha.pdf',
    },
    {
      img: 'assets/docsimg/02complementos/02xanathar.jpg',
      pdf: 'assets/docs/02complementos/02xanathar.pdf',
    },
    {
      img: 'assets/docsimg/02complementos/03multiverso.jpg',
      pdf: 'assets/docs/02complementos/03multiverso.pdf',
    },
  ];

  /**
   * Lista de documentos de aventuras con sus imágenes y rutas de PDF.
   */
  aventuras = [
    {
      img: 'assets/docsimg/03aventuras/01averno.jpg',
      pdf: 'assets/docs/03aventuras/01averno.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/02tiamat.jpg',
      pdf: 'assets/docs/03aventuras/02tiamat.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/03piedracristal.jpg',
      pdf: 'assets/docs/03aventuras/03piedracristal.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/04reytormenta.jpg',
      pdf: 'assets/docs/03aventuras/04reytormenta.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/05agujahelada.jpg',
      pdf: 'assets/docs/03aventuras/05agujalhelada.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/06saltmarsh.jpg',
      pdf: 'assets/docs/03aventuras/06saltmarsh.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/07strahd.jpg',
      pdf: 'assets/docs/03aventuras/07strahd.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/08phandelver.jpg',
      pdf: 'assets/docs/03aventuras/08phandelver.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/09tumba.jpg',
      pdf: 'assets/docs/03aventuras/09tumba.pdf',
    },
    {
      img: 'assets/docsimg/03aventuras/10xaryxis.jpg',
      pdf: 'assets/docs/03aventuras/10xaryxis.pdf',
    },
  ];

  /**
   * Constructor
   *
   * @param {DownloadService} downloadService - Servicio para manejar la descarga de archivos.
   */
  constructor(private downloadService: DownloadService) {}

  /**
   * Método para descargar un archivo PDF.
   *
   * @param {string} pdfPath - La ruta del archivo PDF que se quiere descargar.
   *
   * Este método coge el nombre del archivo de la ruta y luego usa el servicio
   * para iniciar la descarga del archivo.
   */
  download(pdfPath: string) {
    const fileName = pdfPath.split('/').pop() ?? 'document.pdf';
    this.downloadService.downloadFile(pdfPath, fileName);
  }
}
