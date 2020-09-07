import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerificarEmailComponent } from './auth/verificar-email/verificar-email.component';
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { RoleComponent } from "./auth/role/role.component";

const routes: Routes = [
  { path: 'user-profile', component: PerfilUsuarioComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'role', component: RoleComponent },
  { path: 'verification-email', component: VerificarEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
