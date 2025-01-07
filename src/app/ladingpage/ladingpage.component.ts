import { NoticiasComponent } from './../noticias/noticias.component';
import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../auth/login/login.component';
import { ButtonModule } from 'primeng/button';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-ladingpage',
  standalone: true,
  imports: [HeaderComponent, NoticiasComponent, ButtonModule],
  templateUrl: './ladingpage.component.html',
  styleUrl: './ladingpage.component.css',
})
export class LadingpageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    ScrollReveal().reveal('.background-image, .header', {
      duration: 1000,
      delay: 10,
      origin: 'bottom',
      distance: '100px',
      scale: 1,
      easing: 'ease-in-out',
      mobile: true,
      reset: false,
    });
    ScrollReveal().reveal('.content_left', {
      duration: 1000,
      delay: 100,
      origin: 'left',
      distance: '100px',
    });
    ScrollReveal().reveal('.img-logo', {
      duration: 1000,
      delay: 100,
      origin: 'right',
      distance: '100px',
    });
    ScrollReveal().reveal('.noticias', {
      duration: 1000,
      delay: 1000,
      origin: 'top',
      distance: '100px',
      reset: true,
    });
  }
}
