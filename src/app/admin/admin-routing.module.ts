import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';
import { ProductAddEditComponent } from '@admin/components/add-edit/product-add-edit/product-add-edit.component';
import { UserAddEditComponent } from '@admin/components/add-edit/user-add-edit/user-add-edit.component';
import { OrderAddEditComponent } from '@admin/components/add-edit/order-add-edit/order-add-edit.component';
import { UserEditResolver } from '@admin/components/add-edit/user-add-edit/user-edit.resolver';
import { OrderEditResolver } from '@admin/components/add-edit/order-add-edit/order-edit.resolver';
import { ProductEditResolver } from '@admin/components/add-edit/product-add-edit/product-edit.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,

    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: UserAddEditComponent },
      {
        path: 'users/:id',
        component: UserAddEditComponent,
        resolve: {
          user: UserEditResolver,
        },
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/add', component: OrderAddEditComponent },
      {
        path: 'orders/:id',
        component: OrderAddEditComponent,
        resolve: {
          order: OrderEditResolver,
        },
      },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: ProductAddEditComponent },
      {
        path: 'products/:id',
        component: ProductAddEditComponent,
        resolve: {
          product: ProductEditResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
