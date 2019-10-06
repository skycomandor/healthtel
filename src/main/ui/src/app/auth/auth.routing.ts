import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
