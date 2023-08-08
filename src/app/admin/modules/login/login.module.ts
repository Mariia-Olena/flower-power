import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@login/components/login/login.component';
import { MaterialModule } from '@admin/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from '@login/login-routing.module';
import { SharedModule } from '@sharedModule/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
})
export class LoginModule {}
