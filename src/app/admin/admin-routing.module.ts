import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';
import { EditComponent } from './components/crud-buttons/edit/edit.component';
import { AddComponent } from './components/crud-buttons/add/add.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,

    children: [
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit', component: EditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
