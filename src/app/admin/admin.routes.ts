import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchivoComponent } from '../archivo/archivo.component';
import { EntranteComponent } from './entrante/entrante.component';
import { EnviadoComponent } from './enviado/enviado.component';
import { GraficoComponent } from './grafico/grafico.component';
import { PendienteComponent } from './pendiente/pendiente.component';
import { AuthGuard } from '../auth/auth.guard';
import { NuevoDocumentoComponent } from './nuevo-documento/nuevo-documento.component';
import { BuscarComponent } from './buscar/buscar.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
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
        path: 'nuevo',
        component: NuevoDocumentoComponent,
      },
      {
        path: 'buscar',
        component: BuscarComponent,
      },
      {
        path: 'usuario',
        component: BuscarComponent,
      },

    ],
    canActivate: [AuthGuard],
  },
];
