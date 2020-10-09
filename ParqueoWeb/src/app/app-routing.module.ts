import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChooseRolComponent } from './auth/choose-rol/choose-rol.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowUpComponent } from './auth/follow-up/follow-up.component';
import { RequestManagementComponent } from './admin/request-management/request-management.component';
import { PantallaBienvenidaComponent } from './pantalla-bienvenida/pantalla-bienvenida.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'chooserol', component: ChooseRolComponent},
  { path: 'followup', component: FollowUpComponent},
  { path: 'requestManagement', component: RequestManagementComponent},
  { path: 'user-profile', component: PerfilUsuarioComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'welcome', component: PantallaBienvenidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
