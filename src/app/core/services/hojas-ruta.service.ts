import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BuzonHojaRuta, HojaRuta } from '../models/hojaRuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HojasRutaService {
  url = environment.backendUrl + '/hojas-ruta';
  http = inject(HttpClient);
  crearHojaRuta(
    value: Partial<{
      emisorId: string;
      responsableActualId: string;
      estado: string;
    }>,
  ): Observable<HojaRuta> {
    return this.http.post<HojaRuta>(this.url, value);
  }

  derivarHojaRuta(value: {
    idHojaRuta: number;
    idprocedencia: string;
    iddestino: string;
    instruccion: string;
    documento: number;
  }): Observable<HojaRuta> {
    return this.http.post<HojaRuta>(this.url + '/derivar', value);
  }

  getBuzon(idUser: string): Observable<BuzonHojaRuta[]> {
    return this.http.get<BuzonHojaRuta[]>(this.url + '/buzon/' + idUser);
  }

  recibir(id: number, idUser: string): Observable<any> {
    return this.http.post<any>(this.url + '/recibir', { id, receptor: idUser });
  }

  getPendientes(idUser: string): Observable<BuzonHojaRuta[]> {
    return this.http.get<BuzonHojaRuta[]>(this.url + '/pendientes/' + idUser);
  }

  getstats(idUser: string): Observable<any> {
    return this.http.get<any>(this.url + '/stats/' + idUser);
  }
}
