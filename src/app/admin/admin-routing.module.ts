import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,

    children: [
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
