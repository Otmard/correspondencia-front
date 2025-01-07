import { Routes } from '@angular/router';
import { LadingpageComponent } from './ladingpage/ladingpage.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';
import { EntranteComponent } from './admin/entrante/entrante.component';
import { PendienteComponent } from './admin/pendiente/pendiente.component';
import { EnviadoComponent } from './admin/enviado/enviado.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { GraficoComponent } from './admin/grafico/grafico.component';

export const routes: Routes = [
  {
    path: '',
    component: LadingpageComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  {
    path: '**',
    component: Page404Component,
  },
];
