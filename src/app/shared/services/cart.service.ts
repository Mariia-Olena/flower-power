import { Injectable } from '@angular/core';
import {
  CartProduct,
  Product,
} from '@sharedModule/types/product-plant.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsInCart: { [id: string]: CartProduct } =
    this.storageService.get('cart') || {};

  constructor(private storageService: StorageService) {}

  addProduct(product: Product, count: number = 1) {
    if (this.productsInCart[product.id]) {
      this.productsInCart[product.id].count += 1;
    } else {
      this.productsInCart[product.id] = { ...product, count };
    }

    this.storageService.set('cart', this.productsInCart);
  }

  removeProduct(id: string): void {
    delete this.productsInCart[id];
    this.storageService.set('cart', this.productsInCart);
  }

  getSum(): number {
    const productsArray = Object.values(this.productsInCart);
    return productsArray.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }

  showAllProducts(): CartProduct[] {
    return Object.values(this.productsInCart);
  }

  getProductsInCart() {
    return this.productsInCart;
  }

  changeCount(id: string, count: number) {
    if(this.productsInCart[id] && count === 0) {
      this.removeProduct(id)
    }

    if (this.productsInCart[id]) {
      this.productsInCart[id].count = count;
      this.storageService.set('cart', this.productsInCart);
    } else {
      throw new Error('Product is not in the cart');
    }
  }
}
