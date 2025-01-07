import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia, ResNews } from '../models/new';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${environment.keyapiNews}`;

  http = inject(HttpClient);
  getNews(): Observable<ResNews> {
    return this.http.get<ResNews>(this.url);
  }
}
