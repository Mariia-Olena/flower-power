import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductHomeComponent } from './components/product-home/product-home.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ShopHomeComponent } from './components/shop-home/shop-home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ShopHomeComponent,

    children: [
      { path: 'products/id', component: ProductHomeComponent },
      { path: 'products', component: ProductsHomeComponent },
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
