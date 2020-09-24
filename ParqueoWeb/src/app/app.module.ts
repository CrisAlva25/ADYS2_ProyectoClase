import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './servicios/rest.service';
import { AuthService } from "./servicios/auth.service";;
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { SignupComponent } from './auth/signup/signup.component';
import { VerificarEmailComponent } from './auth/verificar-email/verificar-email.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { RoleComponent } from './auth/role/role.component';
import { MenubarInicioComponent } from './menubar-inicio/menubar-inicio.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    VerificarEmailComponent,
    ForgotPasswordComponent,
    RoleComponent,
    MenubarInicioComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [RestService, Title, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
