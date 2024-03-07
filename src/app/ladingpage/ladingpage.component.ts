import { NoticiasComponent } from './../noticias/noticias.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-ladingpage',
  standalone: true,
  imports: [HeaderComponent,NoticiasComponent],
  templateUrl: './ladingpage.component.html',
  styleUrl: './ladingpage.component.css'
})
export class LadingpageComponent {

}
