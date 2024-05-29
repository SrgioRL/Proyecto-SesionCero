import { Component } from '@angular/core';
import { DownloadService } from '../services/download.service'; // Ajustar la ruta

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent {
  esenciales = [
    { img: 'assets/docsimg/01esenciales/01jugador.jpg', pdf: 'assets/docs/01esenciales/01jugador.pdf' },
    { img: 'assets/docsimg/01esenciales/02master.jpg', pdf: 'assets/docs/01esenciales/02master.pdf' },
    { img: 'assets/docsimg/01esenciales/03monstruos.jpg', pdf: 'assets/docs/01esenciales/03monstruos.pdf' },
    { img: 'assets/docsimg/01esenciales/04hojapersonaje.jpg', pdf: 'assets/docs/01esenciales/04hojapersonaje.pdf' },
  ];

  complementos = [
    { img: 'assets/docsimg/02complementos/01tasha.jpg', pdf: 'assets/docs/02complementos/01tasha.pdf' },
    { img: 'assets/docsimg/02complementos/02xanathar.jpg', pdf: 'assets/docs/02complementos/02xanathar.pdf' },
    { img: 'assets/docsimg/02complementos/03multiverso.jpg', pdf: 'assets/docs/02complementos/03multiverso.pdf' },
  ];

  aventuras = [
    { img: 'assets/docsimg/03aventuras/01averno.jpg', pdf: 'assets/docs/03aventuras/01averno.pdf' },
    { img: 'assets/docsimg/03aventuras/02tiamat.jpg', pdf: 'assets/docs/03aventuras/02tiamat.pdf' },
    { img: 'assets/docsimg/03aventuras/03piedracristal.jpg', pdf: 'assets/docs/03aventuras/03piedracristal.pdf' },
    { img: 'assets/docsimg/03aventuras/04reytormenta.jpg', pdf: 'assets/docs/03aventuras/04reytormenta.pdf' },
    { img: 'assets/docsimg/03aventuras/05agujahelada.jpg', pdf: 'assets/docs/03aventuras/05agujalhelada.pdf' },
    { img: 'assets/docsimg/03aventuras/06saltmarsh.jpg', pdf: 'assets/docs/03aventuras/06saltmarsh.pdf' },
    { img: 'assets/docsimg/03aventuras/07strahd.jpg', pdf: 'assets/docs/03aventuras/07strahd.pdf' },
    { img: 'assets/docsimg/03aventuras/08phandelver.jpg', pdf: 'assets/docs/03aventuras/08phandelver.pdf' },
    { img: 'assets/docsimg/03aventuras/09tumba.jpg', pdf: 'assets/docs/03aventuras/09tumba.pdf' },
    { img: 'assets/docsimg/03aventuras/10xaryxis.jpg', pdf: 'assets/docs/03aventuras/10xaryxis.pdf' },
  ];

  constructor(private downloadService: DownloadService) {}

  download(pdfPath: string) {
    const fileName = pdfPath.split('/').pop() ?? 'document.pdf';
    this.downloadService.downloadFile(pdfPath, fileName);
  }
}
