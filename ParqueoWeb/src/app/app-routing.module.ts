import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioComponent } from "./perfil-usuario/perfil-usuario.component";
import { LoginParqueoAdminComponent } from './login-parqueo-admin/login-parqueo-admin.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'perfil-usuario', component: PerfilUsuarioComponent },
  { path: 'login-parqueo-admin', component: LoginParqueoAdminComponent },
  { path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
