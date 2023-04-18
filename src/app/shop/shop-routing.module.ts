import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductHomeComponent } from '@product/product-home.component';
import { ProductsHomeComponent } from '@products/products-home.component';
import { ShopHomeComponent } from '@shop/shop-home/shop-home.component';
import { HomePageComponent } from '@shop/home-page/home-page.component';
import { NotFoundComponent } from '@shop/not-found/not-found.component';
import { CartComponent } from '@shop/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ShopHomeComponent,

    children: [
      { path: 'products/:id', component: ProductHomeComponent },
      { path: 'products', component: ProductsHomeComponent },
      { path: 'cart', component: CartComponent },
      { path: '', component: HomePageComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
