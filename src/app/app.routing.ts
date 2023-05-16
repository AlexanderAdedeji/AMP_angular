import { Routes } from '@angular/router';
import { GuardNameGuard } from './guard-name.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
    path: '',
    loadChildren: () => import('./Authentication/auth-module/auth-module.module').then(m => m.AuthModuleModule)
      }
    ]
  } 
  ,{
    path: 'AMP',
    // canActivate : [GuardNameGuard],
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
 
  {
    path: '**',
    redirectTo: ''
  }
]
