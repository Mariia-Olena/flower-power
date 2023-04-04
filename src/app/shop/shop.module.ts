import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HeaderComponent } from '../header/header.component';
import { ProductsComponent } from '../products/products.component';
import { ProductComponent } from '../product/product.component';
import { ShopHomeComponent } from './shop-home/shop-home.component';

@NgModule({
  declarations: [HeaderComponent, ProductsComponent, ProductComponent, ShopHomeComponent],
  imports: [CommonModule, ShopRoutingModule],
})
export class ShopModule {}
