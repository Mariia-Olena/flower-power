import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { APIproduct } from '@sharedModule/types/product-plant.interface';
import { Plant } from '@shop/product-home/components/product/types/plant.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: Plant[] = [];

  constructor() { }

  addProduct(product: Plant) {
    this.productsInCart.push(product);
    console.log('productsInCart', this.productsInCart);
  }

  showAllProducts() {
    return this.productsInCart
  }

}
