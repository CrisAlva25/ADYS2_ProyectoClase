import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { LoginParqueoComponent } from './auth/login-parqueo/login-parqueo.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterParqueoComponent } from './auth/register-parqueo/register-parqueo.component';
import { VerificarUsuarioComponent } from './auth/verificar-usuario/verificar-usuario.component';
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: 'user-profile', component: PerfilUsuarioComponent },
  { path: 'login-parking', component: LoginParqueoComponent },
  { path: 'register-parking', component: RegisterParqueoComponent },
  { path: 'verify-user', component: VerificarUsuarioComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'login-user', component: LoginComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
