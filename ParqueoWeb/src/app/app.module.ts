import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './rest.service';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginParqueoAdminComponent } from './login-parqueo-admin/login-parqueo-admin.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ParqueoFormComponent } from './parqueo-form/parqueo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilUsuarioComponent,
    LoginParqueoAdminComponent,
    AdminComponent,
    LoginComponent,
    ParqueoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
