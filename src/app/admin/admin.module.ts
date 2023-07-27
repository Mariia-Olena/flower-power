import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SharedModule } from '@sharedModule/shared.module';


@NgModule({
  declarations: [
    AdminPageComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
