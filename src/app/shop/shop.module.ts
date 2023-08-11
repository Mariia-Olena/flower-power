import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { NgxMaskModule } from 'ngx-mask';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '@sharedModule/shared.module';

import { HeaderComponent } from '@shop/header/header.component';
import { NotFoundComponent } from '@shop/not-found/not-found.component';
import { HomePageComponent } from '@shop/home-page/home-page.component';
import { ShopPageComponent } from '@shop/shop-page/shop-page.component';
import { CartComponent } from '@shop/cart/cart.component';
import { TooltipComponent } from '@shop/tooltip/tooltip.component';
import { OrderComponent } from '@shop/order-page/components/order/order.component';
import { HomeSliderComponent } from '@shop/home-page/components/home-slider/home-slider.component';
import { InfoComponent } from '@shop/home-page/components/info/info.component';
import { FooterComponent } from '@shop/footer/footer.component';
import { OrderPageComponent } from '@shop/order-page/order-page.component';
import { OrderFormComponent } from '@shop/order-page/components/order-form/order-form.component';
import { ConfirmationPageComponent } from '@shop/confirmation-page/confirmation-page.component';
import { ModalComponent } from '@shop/modal/modal.component';

import { ProductsPageComponent } from '@products/products-page.component';
import { ProductCardComponent } from '@productsPage/product-card/product-card.component';
import { ProductsComponent } from '@productsPage/products/products.component';
import { FilterComponent } from '@productsPage/filter/filter.component';
import { ProductViewComponent } from '@productsPage/product-view/product-view.component';

import { ProductPageComponent } from '@product/product-page.component';
import { ProductComponent } from '@productPage/product/product.component';
import { ProductReviewComponent } from '@productPage/product-review/product-review.component';
import { ProductSliderComponent } from '@productPage/product-slider/product-slider.component';
import { ProductInfoComponent } from '@productPage/product-info/product-info.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    ShopPageComponent,
    CartComponent,
    HomePageComponent,
    NotFoundComponent,
    FilterComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProductReviewComponent,
    ProductInfoComponent,
    ProductsPageComponent,
    ProductViewComponent,
    ProductSliderComponent,
    TooltipComponent,
    OrderComponent,
    HomeSliderComponent,
    InfoComponent,
    FooterComponent,
    OrderPageComponent,
    OrderFormComponent,
    ConfirmationPageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTippyModule,
    NgxMaskModule.forRoot()
  ],
})
export class ShopModule {}
