import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from '../products/products.component';
import { ProductComponent } from '../product/product.component';
import { ShopHomeComponent } from './shop-home/shop-home.component';

const routes: Routes = [
  {
    path: '',
    component: ShopHomeComponent,
    children: [
      { path: 'products/1', component: ProductComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
