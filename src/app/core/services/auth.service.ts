import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private messageService = inject(MessageService);
  router = inject(Router);
  authState$ = authState(this.auth);
  private authStateSubscription: Subscription;

  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (user: User | null) => {
      },
    );
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.messageService.add({
        severity: 'success',
        summary: 'Login exitoso',
        detail: 'Has iniciado sesión',
      });
      this.router.navigate(['/admin']);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error en el login',
        detail: 'Usuario o contraseña incorrectos',
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.messageService.add({
        severity: 'info',
        summary: 'Sesión cerrada',
        detail: 'Has cerrado sesión',
      });
      this.authStateSubscription.unsubscribe();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error en el cierre de sesión', error);
      throw error;
    }
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
}
