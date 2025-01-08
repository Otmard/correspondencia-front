import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    FormsModule,
    PasswordModule,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emalil!: string;
  password!: string;
  authService = inject(AuthService);
  @Output() closelogin = new EventEmitter<boolean>();

  enviarAlPadre() {
    this.closelogin.emit(true);
  }
}
