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
import { FeedComponent } from './feed/feed.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBarInicioComponent } from './welcome/nav-bar-inicio/nav-bar-inicio.component';
import { ListarPromocionesComponent } from './listar-promociones/listar-promociones.component';
import { BloqueosComponent } from "./admin/bloqueos/bloqueos.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'chooserol', component: ChooseRolComponent},
  { path: 'followup', component: FollowUpComponent},
  { path: 'requestManagement', component: RequestManagementComponent},
  { path: 'user-profile', component: PerfilUsuarioComponent },
  { path: 'admin', component: AdminComponent},
  { path: '', component: WelcomeComponent},
  { path: 'noticias', component: FeedComponent},
  { path: 'reportUsers', component: ReportUserComponent},
  { path: 'listarPromociones', component: ListarPromocionesComponent},
  { path: 'bloqueos', component: BloqueosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
