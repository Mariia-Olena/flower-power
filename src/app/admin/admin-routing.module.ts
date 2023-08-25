import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPageComponent } from '@admin/components/admin-page/admin-page.component';
import { OrdersComponent } from '@admin/components/entities/orders/orders.component';
import { ProductsComponent } from '@admin/components/entities/products/products.component';
import { UsersComponent } from '@admin/components/entities/users/users.component';
import { ProductAddEditComponent } from './components/add-edit/product-add-edit/product-add-edit.component';
import { UserAddEditComponent } from './components/add-edit/user-add-edit/user-add-edit.component';
import { OrderAddEditComponent } from './components/add-edit/order-add-edit/order-add-edit.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { EditResolver } from './components/add-edit/edit.resolver';
import {
  APIproduct,
  Product,
} from '@sharedModule/services/entities/types/product.interface';

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
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/add', component: OrderAddEditComponent },
      { path: 'orders/:id', component: OrderAddEditComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: ProductAddEditComponent },
      {
        path: 'products/:id',
        component: ProductAddEditComponent,
        resolve: {
          products: EditResolver
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
