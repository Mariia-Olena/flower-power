import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPageComponent } from '@product/product-page.component';
import { ProductsPageComponent } from '@products/products-page.component';
import { ShopPageComponent } from '@shop/shop-page/shop-page.component';
import { HomePageComponent } from '@shop/home-page/home-page.component';
import { NotFoundComponent } from '@shop/not-found/not-found.component';
import { CartComponent } from '@shop/cart/cart.component';
import { OrderPageComponent } from '@shop/order-page/order-page.component';
import { ConfirmationPageComponent } from '@shop/confirmation-page/confirmation-page.component';
import { ConfirmationGuard } from '@shop/confirmation-page/guards/confirmation.guard';
import { OrderGuard } from '@shop/order-page/guards/order.guard';

const routes: Routes = [
  {
    path: '',
    component: ShopPageComponent,

    children: [
      { path: 'products/:id', component: ProductPageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderPageComponent, canActivate: [OrderGuard] },
      { path: 'confirmation', component: ConfirmationPageComponent, canActivate: [ConfirmationGuard] },
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
