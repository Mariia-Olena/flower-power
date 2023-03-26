import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShopHomeComponent } from './components/shop-home/shop-home.component';

import { ProductCardComponent } from './components/products-home/product-card/product-card.component';
import { ProductsComponent } from './components/products-home/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterComponent } from './components/products-home/filter/filter.component';

import { ProductHomeComponent } from './components/product-home/product-home.component';
import { ProductComponent } from './components/product-home/product/product.component';
import { ProductReviewComponent } from './components/product-home/product-review/product-review.component';
import { ProductInfoComponent } from './components/product-home/product-info/product-info.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ProductViewComponent } from './components/products-home/product-view/product-view.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    ShopHomeComponent,
    CartComponent,
    HomePageComponent,
    NotFoundComponent,
    FilterComponent,
    ProductCardComponent,
    ProductHomeComponent,
    ProductReviewComponent,
    ProductInfoComponent,
    ProductsHomeComponent,
    ProductViewComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
})
export class ShopModule {}
