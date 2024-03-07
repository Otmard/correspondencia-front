import { Routes } from '@angular/router';
import { LadingpageComponent } from './ladingpage/ladingpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';

export const routes: Routes = [
  {
    path: '',
    component: LadingpageComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
];
