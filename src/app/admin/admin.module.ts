import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@sharedModule/shared.module';
import { AdminRoutingModule } from '@admin/admin-routing.module';
import { MaterialModule } from '@admin/modules/material/material.module';
import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ToolbarComponent } from '@admin/components/toolbar/toolbar.component';
import { TableComponent } from '@admin/components/table/table.component';
import { ProductAddEditComponent } from '@admin/components/add-edit/product-add-edit/product-add-edit.component';
import { OrderAddEditComponent } from './components/add-edit/order-add-edit/order-add-edit.component';
import { UserAddEditComponent } from './components/add-edit/user-add-edit/user-add-edit.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    ToolbarComponent,
    TableComponent,
    ProductAddEditComponent,
    OrderAddEditComponent,
    UserAddEditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
