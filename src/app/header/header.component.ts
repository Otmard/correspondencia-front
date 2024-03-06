import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgOptimizedImage } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, InputTextModule, NgOptimizedImage, DialogModule,LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  modalLogin: boolean = false;
  showLogin() {
    this.modalLogin = true;
  }
}
