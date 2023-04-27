import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxTippyModule } from 'ngx-tippy-wrapper';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '@sharedModule/shared.module';

import { HeaderComponent } from '@shop/header/header.component';
import { NotFoundComponent } from '@shop/not-found/not-found.component';
import { HomePageComponent } from '@shop/home-page/home-page.component';
import { ShopHomeComponent } from '@shop/shop-home/shop-home.component';
import { CartComponent } from '@shop/cart/cart.component';

import { ProductsHomeComponent } from '@products/products-home.component';
import { ProductCardComponent } from '@productsHome/product-card/product-card.component';
import { ProductsComponent } from '@productsHome/products/products.component';
import { FilterComponent } from '@productsHome/filter/filter.component';
import { ProductViewComponent } from '@productsHome/product-view/product-view.component';

import { ProductHomeComponent } from '@product/product-home.component';
import { ProductComponent } from '@productHome/product/product.component';
import { ProductReviewComponent } from '@productHome/product-review/product-review.component';
import { ProductInfoComponent } from '@productHome/product-info/product-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTippyModule
  ],
})
export class ShopModule {}
