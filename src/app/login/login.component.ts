import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
