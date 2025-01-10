import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { GraficoComponent } from '../grafico/grafico.component';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ContadorAnimadoComponent } from '../../components/contador-animado/contador-animado.component';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HojasRutaService } from '../../core/services/hojas-ruta.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgClass,
    GraficoComponent,
    SplitButtonModule,
    ContadorAnimadoComponent,
    AvatarModule,
    BadgeModule,
    OverlayPanelModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  getinitial(): string | undefined {
    return this.user?.displayName?.charAt(0)?.toUpperCase();
  }
  items: MenuItem[] = [
    { label: 'Nota Interna' },
    {
      label: 'Informe',
    },
    {
      label: 'Carta',
    },
  ];
  user: User | null = null;
  userSubscription!: Subscription;
  authService = inject(AuthService);
  router = inject(Router);

  hojasRutaService = inject(HojasRutaService);
  cantidadArchivo: number = 0;
  cantidadEnviados: number = 0;
  cantidadPendientes: number = 0;
  cantidadEntrante: number = 0;

  ngOnInit() {
    this.userSubscription = this.authService.authState$.subscribe((user) => {
      this.user = user; // Actualiza la propiedad 'user' con el estado actual

      this.hojasRutaService.reloadData$.subscribe(() => {
        this.hojasRutaService.getstats(user?.uid!).subscribe((res) => {
          res.forEach((item: any) => {
            switch (item.estado) {
              case 'EMITIDA':
                this.cantidadEnviados = item.cantidad;
                break;
              case 'RECIBIDA':
                this.cantidadPendientes = item.cantidad;
                break;
              case 'DERIVADA':
                this.cantidadEntrante = item.cantidad;
                break;
              case 'ARCHIVADA':
                this.cantidadArchivo = item.cantidad;
                break;
            }
          });
        });
      });
    });
  }

  overlayVisible = false;
}
