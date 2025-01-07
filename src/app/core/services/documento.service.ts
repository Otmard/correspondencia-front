import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HojaRuta } from '../models/hojaRuta';
import { Documento } from '../models/documentos';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  url = environment.backendUrl + '/documentos';
  http = inject(HttpClient);
  crearDocumento(
    value: Partial<{
      userId: string;
      cite: string;
      archivoPrincipal: number;
      adjuntos: number[];
    }>,
  ): Observable<Documento> {
    return this.http.post<Documento>(this.url, value);
  }
}