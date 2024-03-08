import { Routes } from '@angular/router';
import { LadingpageComponent } from './ladingpage/ladingpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';
import { EntranteComponent } from './entrante/entrante.component';
import { PendienteComponent } from './pendiente/pendiente.component';
import { EnviadoComponent } from './enviado/enviado.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { GraficoComponent } from './grafico/grafico.component';

export const routes: Routes = [
  {
    path: '',
    component: LadingpageComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'entrante',
        component: EntranteComponent,
      },
      {
        path: 'pendiente',
        component: PendienteComponent,
      },
      {
        path: 'enviado',
        component: EnviadoComponent,
      },
      {
        path: 'archivo',
        component: ArchivoComponent,
      },
      {
        path:'grafico',
        component:GraficoComponent
      }
    ],
  },

  {
    path: '**',
    component: Page404Component,
  },
];
