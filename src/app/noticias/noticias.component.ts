import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from './product.service';
import { Product } from './product';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { NewsService } from '../core/services/news.service';
import { Noticia } from '../core/models/new';
import { CardModule } from 'primeng/card';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, CardModule, SlicePipe],
  providers: [ProductService],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss',
})
export class NoticiasComponent implements OnInit {
  noticias!: Noticia[]
  responsiveOptions: any[] | undefined;

  newService = inject(NewsService)
  ngOnInit() {
    this.newService.getNews().subscribe((news) => {
      console.log(news);
      this.noticias = news.articles;
    });


    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
