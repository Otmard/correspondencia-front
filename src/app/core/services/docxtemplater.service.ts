import { inject, Injectable } from '@angular/core';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { getAuth } from '@angular/fire/auth';
import { NuevoDocumento } from '../models/documentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocxtemplaterService {
  url = environment.backendUrl;
  http = inject(HttpClient);
  async generateDocument(data: any): Promise<void> {
    const preparedData = {
      cite: data.cite,
      destinatario: data.destinatario.fullName,
      cargoDestinatario: data.destinatario.cargo || data.cargoDestinatario,
      remitente: data.remitente,
      cargoRemitente: data.cargoRemitente,
      referencia: String(data.referencia).toUpperCase(),
      fecha: new Date().toLocaleDateString('es-ES'), // Fecha actual
    };
    try {
      // Cargar la plantilla desde la carpeta de assets
      const template = await fetch('/assets/doc.docx').then((res) =>
        res.arrayBuffer(),
      );

      // Cargar la plantilla en PizZip
      const zip = new PizZip(template);

      // Inicializar Docxtemplater con la plantilla
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Reemplazar etiquetas con datos
      doc.setData(preparedData);

      // Renderizar el documento
      doc.render();

      // Generar el archivo .docx
      const output = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      // Descargar el archivo generado
      saveAs(output, `${preparedData.cite}.docx`);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  }
  getNextCite(): Observable<NuevoDocumento> {
    const id = getAuth().currentUser?.uid;
    return this.http.get<NuevoDocumento>(
      `${this.url}/documentos/generate-cite/${id}`,
    );
  }
}
