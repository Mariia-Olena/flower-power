import { Injectable } from '@angular/core';
import {
  CartProduct,
  Product,
} from '@sharedModule/types/product-plant.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private productsInCart: {[id: string]: CartProduct} = {};

  constructor() {}

  addProduct(product: Product, count: number = 1) {
    if (this.productsInCart[product.id]) {
      this.productsInCart[product.id].count += 1
    } else {
      this.productsInCart[product.id] = ({ ...product, count });
    }
  }

  removeProduct(id: string): void {
    delete this.productsInCart[id]
  }

  getSum(): number {
    const productsArray = Object.values(this.productsInCart)
    return productsArray.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }

  get sum(): number {
    const productsArray = Object.values(this.productsInCart)
    return productsArray.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
  }

  showAllProducts(): CartProduct[] {
    return Object.values(this.productsInCart)
  }
}
