import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  http = inject(HttpClient);
  url = `${environment.backendUrl}/archivos`;
  subitFileServer(tipo: string, key: string, bucket: string) {
    return this.http.post(this.url, { tipo, key, bucket });
    // pipe(
    //   catchError((error) => {
    //     console.error('Error al subir el archivo', error);
    //     const errorMessage =
    //       error?.error?.message || 'Error al subir el archivo';
    //     return throwError(() => new Error(errorMessage));
    //   }),
    // );
  }
}
