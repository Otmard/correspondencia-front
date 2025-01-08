import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HojaRuta } from '../models/hojaRuta';
import { Documento } from '../models/documentos';
import { PadNumberPipe } from '../pipe/pad-number.pipe';

@Injectable({
  providedIn: 'root',
})
export class GeneratePdfService {
  constructor(private padNumberPipe: PadNumberPipe) {}

  async genrarHojaRuta(hojaRuta: HojaRuta) {
    const doc = new jsPDF('p', 'mm', 'a4');

    const cachedImage = await this.getImageFromCache(
      'https://minio-kokscc0scssowkwc0k8wk8kc.92.112.176.8.sslip.io/photospublic/hojaRuta.jpg',
    );

    if (cachedImage) {
      console.log('Imagen cargada desde la caché');
    } else {
      console.log('Imagen no encontrada en la caché. Descargándola...');
      await this.saveImageToCache(
        'https://minio-kokscc0scssowkwc0k8wk8kc.92.112.176.8.sslip.io/photospublic/hojaRuta.jpg',
      );
    }
    doc.addImage(await this.blobToDataURL(cachedImage!), 'JPG', 0, 0, 210, 297);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(this.padNumberPipe.transform(hojaRuta.id), 175, 13);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(hojaRuta.createdAt.toLocaleString(), 58, 41);
    doc.text(hojaRuta.responsableActual.fullName, 44.87, 52.15);
    doc.text(hojaRuta.emisor.fullName, 44.79, 56.98);
    doc.text(hojaRuta.cite, 160, 53);
    doc.text(hojaRuta.referencia, 45, 63.98);
    window.open(doc.output('bloburi'), '_blank');
  }
  blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convierte el Blob a Data URL
    });
  }
  async saveImageToCache(url: string): Promise<void> {
    // Abrimos o creamos una caché llamada "image-cache"
    const cache = await caches.open('image-cache');

    // Descargamos la imagen desde la URL y la almacenamos en la caché
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response);
      console.log(`Imagen almacenada en la caché: ${url}`);
    } else {
      console.error(`Error al descargar la imagen: ${response.status}`);
    }
  }
  async getImageFromCache(url: string): Promise<Blob | null> {
    // Abrimos la caché
    const cache = await caches.open('image-cache');

    // Intentamos encontrar la imagen en la caché
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      // Convertimos la imagen en un objeto URL utilizable
      const blob = await cachedResponse.blob();
      return blob; // Devuelve una URL local del navegador
    } else {
      console.warn(`Imagen no encontrada en la caché: ${url}`);
      return null;
    }
  }
}
