import { Injectable } from '@angular/core';
import {
  CartProduct,
  Product,
} from '@sharedModule/types/product-plant.interface';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsInCart: {[id: string]: CartProduct} = {};

  constructor(private sessionStorageService: SessionStorageService) {}

  addProduct(product: Product, count: number = 1) {
    if (this.productsInCart[product.id]) {
      this.productsInCart[product.id].count += 1
    } else {
      this.productsInCart[product.id] = ({ ...product, count });
    }

    this.sessionStorageService.set(product.id, this.productsInCart[product.id])
  }

  removeProduct(id: string): void {
    delete this.productsInCart[id];
    this.sessionStorageService.remove(id)
  }

  getSum(): number {
    const productsArray = Object.values(this.productsInCart)
    return productsArray.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }

  showAllProducts(): CartProduct[] {    
    return Object.values(this.productsInCart)
  }

  getProductsInCart() {
    return this.productsInCart
  }

  setCartFromSessionStorage() {
    this.productsInCart = this.sessionStorageService.getAll()    
  }

}
