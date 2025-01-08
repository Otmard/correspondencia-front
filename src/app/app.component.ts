import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { NoticiasComponent } from './noticias/noticias.component';
// import { NoticiasComponent } from './noticias/NoticiasComponent';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TestService } from './core/services/test.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NoticiasComponent,
    RouterLink,
    CardModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'corr-front';
  loading: boolean = false; // Variable para mostrar el indicador de carga

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Comienza la navegación (muestra el spinner)
        this.loading = true;
      } else if (
        event instanceof NavigationEnd || // La navegación terminó exitosamente
        event instanceof NavigationCancel || // La navegación fue cancelada
        event instanceof NavigationError // Ocurrió un error en la navegación
      ) {
        this.loading = false; // Oculta el spinner
      }
    });
  }
  testService = inject(TestService);
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.translation.upload = 'Subir Archivos';
    this.primengConfig.translation.cancel = 'Cancelar';
    // this.testService.getData().subscribe((data) => console.log(data));
  }
}
