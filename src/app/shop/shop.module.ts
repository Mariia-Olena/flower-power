import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ShopHomeComponent } from './components/shop-home/shop-home.component';
import { CartComponent } from './components/cart/cart.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    ShopHomeComponent,
    CartComponent,
    HomePageComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, ShopRoutingModule],
})
export class ShopModule {}
