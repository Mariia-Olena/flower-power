import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  CartProduct,
  Product,
} from '@sharedModule/types/product-plant.interface';
import { Plant } from '@shop/product-home/components/product/types/plant.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsInCart: CartProduct[] = [];
  private mapProductsInCart: {[key: string] : boolean}

  constructor() {}

  addProduct(product: Product, count: number = 1) {
    this.productsInCart.push({ ...product, count });
    this.mapProductsInCart[product.id] = true;
    console.log('productsInCart', this.productsInCart);
  }

  showAllProducts() {
    return this.productsInCart;
  }
}
