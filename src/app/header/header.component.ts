import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    NgOptimizedImage,
    DialogModule,
    LoginComponent,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
closeLogin($event: boolean) {
 if ($event) {
  this.modalLogin=false
 }
}

  modalLogin: boolean = false;
  value1: number = 0;
  value2: number = 0;
  value3: number = 0;
  value4: number = 0;

  showLogin() {
    this.modalLogin = true;
  }
}
