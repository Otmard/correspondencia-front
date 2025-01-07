// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return authState(this.auth).pipe(
      map((user) => {
        if (user) {
          return true; // Usuario autenticado, permitir acceso
        } else {
          this.router.navigate(['/']); // Redirigir a la página de login si no está autenticado
          return false; // Usuario no autenticado, denegar acceso
        }
      }),
    );
  }
}
