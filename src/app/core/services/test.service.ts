import { Injectable } from '@angular/core';
import { from, map, Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
  numero = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numeroObservable = from(this.numero);
  getData():Observable<number>{
    return this.numeroObservable.pipe(map(numero => {return numero * 2}));
  }
}
