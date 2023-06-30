import { Injectable } from '@angular/core';
import {
  CartProduct,
  Product,
} from '@sharedModule/types/product-plant.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StorageService } from './storage.service';

interface CartItem {
  product: Product;
  count: number;
  params?: {
    color: string;
    size: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class CartV2Service {
  private productsInCart: BehaviorSubject<{ [key: string]: CartItem }> =
    new BehaviorSubject(this.storageService.get('cart-v2') || {});
  
  cart$: Observable<CartItem[]> = this.productsInCart.asObservable().pipe(
    map((value: { [key: string]: CartItem }): CartItem[]  => {
      return Object.values(value);
    })
  );

  total$: Observable<number> = this.cart$.pipe(
    map((value: CartItem[]): number  => {
      return value.reduce((acc: number, curr: CartItem): number => {
        return acc + curr.count * curr.product.price
      }, 0)
    })
  )

  constructor(private storageService: StorageService) {}

  addProduct(
    product: Product,
    count: number = 1,
    params?: { color: string; size: string }
  ) {
    const productInCart: CartItem = this.productsInCart.getValue()[product.id];
    if (productInCart) {
      this.productsInCart.next({
        ...this.productsInCart.getValue(),
        [product.id]: {
          ...productInCart,
          count: productInCart.count + count,
        },
      });
    } else {
      this.productsInCart.next({
        ...this.productsInCart.getValue(),
        [product.id]: { product, count, params },
      });
    }

    this.storageService.set('cart-v2', this.productsInCart.getValue());
  }

  // removeProduct(id: string): void {
  //   delete this.productsInCart[id];
  //   this.storageService.set('cart', this.productsInCart);
  // }

  // getSum(): number {
  //   const productsArray = Object.values(this.productsInCart);
  //   return productsArray.reduce(
  //     (acc, item) => acc + item.price * item.count,
  //     0
  //   );
  // }

  // showAllProducts(): CartProduct[] {
  //   return Object.values(this.productsInCart);
  // }

  // getProductsInCart() {
  //   return this.productsInCart;
  // }

  // changeCount(id: string, count: number) {
  //   if(this.productsInCart[id] && count === 0) {
  //     this.removeProduct(id)
  //   }

  //   if (this.productsInCart[id]) {
  //     this.productsInCart[id].count = count;
  //     this.storageService.set('cart', this.productsInCart);
  //   } else {
  //     throw new Error('Product is not in the cart');
  //   }
  // }
}
