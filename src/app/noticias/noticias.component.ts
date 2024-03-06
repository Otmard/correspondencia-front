import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductService } from './product.service';
import { Product } from './product';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  providers: [ProductService],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss',
})
export class NoticiasComponent implements OnInit {
  products: any;
  imagenes: any[] = [
    'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/407349757_681903237410747_1019235726402762819_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=z4qGOBjqAeIAX_P0QMQ&_nc_ht=scontent.flpb1-1.fna&oh=00_AfAX_8sMcKelAQ4EbcaEZFGFZCNwI7QAOJMXqPAhgt1N6Q&oe=65ED230B',
    'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/407349757_681903237410747_1019235726402762819_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=z4qGOBjqAeIAX_P0QMQ&_nc_ht=scontent.flpb1-1.fna&oh=00_AfAX_8sMcKelAQ4EbcaEZFGFZCNwI7QAOJMXqPAhgt1N6Q&oe=65ED230B',
    'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/407349757_681903237410747_1019235726402762819_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=z4qGOBjqAeIAX_P0QMQ&_nc_ht=scontent.flpb1-1.fna&oh=00_AfAX_8sMcKelAQ4EbcaEZFGFZCNwI7QAOJMXqPAhgt1N6Q&oe=65ED230B',
    'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/407349757_681903237410747_1019235726402762819_n.jpg?stp=dst-jpg_s960x960&_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=z4qGOBjqAeIAX_P0QMQ&_nc_ht=scontent.flpb1-1.fna&oh=00_AfAX_8sMcKelAQ4EbcaEZFGFZCNwI7QAOJMXqPAhgt1N6Q&oe=65ED230B',

  ];
  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
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
