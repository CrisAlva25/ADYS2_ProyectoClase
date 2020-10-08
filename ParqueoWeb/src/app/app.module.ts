import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './servicios/rest.service';
import { AuthService } from "./servicios/auth.service";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChooseRolComponent } from './auth/choose-rol/choose-rol.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowUpComponent } from './auth/follow-up/follow-up.component';
import { RequestManagementComponent } from './admin/request-management/request-management.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    ChooseRolComponent,
    DashboardComponent,
    FollowUpComponent,
    RequestManagementComponent
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
