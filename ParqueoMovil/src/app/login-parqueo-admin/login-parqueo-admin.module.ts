import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginParqueoAdminPageRoutingModule } from './login-parqueo-admin-routing.module';

import { LoginParqueoAdminPage } from './login-parqueo-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginParqueoAdminPageRoutingModule
  ],
  declarations: [LoginParqueoAdminPage]
})
export class LoginParqueoAdminPageModule {}
