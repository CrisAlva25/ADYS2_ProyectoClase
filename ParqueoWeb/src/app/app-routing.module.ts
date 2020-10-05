import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { AdminComponent } from './admin/admin.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { ChooseRolComponent } from './login/choose-rol/choose-rol.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: PerfilUsuarioComponent },
  { path: 'register', component: SignUpComponent},
  { path: 'login', component: SignInComponent},
  { path: 'chooserol', component: ChooseRolComponent},
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
