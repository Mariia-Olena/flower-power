import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';
import { ProductAddEditComponent } from './components/add-edit/product-add-edit/product-add-edit.component';
import { UserAddEditComponent } from './components/add-edit/user-add-edit/user-add-edit.component';
import { OrderAddEditComponent } from './components/add-edit/order-add-edit/order-add-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,

    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: UserAddEditComponent },
      { path: 'users/edit/:id', component: UserAddEditComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/add', component: OrderAddEditComponent },
      { path: 'orders/edit/:id', component: OrderAddEditComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: ProductAddEditComponent },
      { path: 'products/edit/:id', component: ProductAddEditComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
