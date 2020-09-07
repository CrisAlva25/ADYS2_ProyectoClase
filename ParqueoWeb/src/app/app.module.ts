import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './servicios/rest.service';
import { AuthService } from "./auth/service/auth.service";;
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginParqueoComponent } from './auth/login-parqueo/login-parqueo.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { RegisterParqueoComponent } from './auth/register-parqueo/register-parqueo.component';
import { VerificarUsuarioComponent } from './auth/verificar-usuario/verificar-usuario.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    LoginParqueoComponent,
    AdminComponent,
    LoginComponent,
    RegisterParqueoComponent,
    VerificarUsuarioComponent,
    ForgotPasswordComponent
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
