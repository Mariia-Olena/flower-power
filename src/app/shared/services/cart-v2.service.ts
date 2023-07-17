import { Injectable } from '@angular/core';
import { Product } from '@sharedModule/types/product-plant.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StorageService } from './storage.service';

export interface CartItem {
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
  private productsInCart$: BehaviorSubject<{ [key: string]: CartItem }> =
    new BehaviorSubject(this.storageService.get('cart-v2') || {});

  private cart$: Observable<CartItem[]> = this.productsInCart$
    .asObservable()
    .pipe(
      map((value: { [key: string]: CartItem }): CartItem[] => {
        return Object.values(value);
      })
    );

  total$: Observable<number> = this.cart$.pipe(
    map((value: CartItem[]): number => {
      return value.reduce((acc: number, curr: CartItem): number => {
        return acc + curr.count * curr.product.price;
      }, 0);
    })
  );

  constructor(private storageService: StorageService) {}

  setCart(): Observable<CartItem[]> {
    return this.cart$;
  }

  hasProductsInCart(): boolean {
    return !!Object.keys(this.productsInCart$.getValue()).length;
  }

  clearCart() {
    this.productsInCart$.next({});
    this.storageService.remove('cart-v2');
  }

  isInCart(id: string): boolean {
    return !!this.productsInCart$.getValue()[id];
  }

  getCount(id: string): number {
    return this.productsInCart$.getValue()[id].count;
  }

  addProduct(
    product: Product,
    count: number = 1,
    params?: { color: string; size: string }
  ) {
    const productInCart: CartItem = this.productsInCart$.getValue()[product.id];

    if (productInCart) {
      this.productsInCart$.next({
        ...this.productsInCart$.getValue(),
        [product.id]: {
          ...productInCart,
          count: productInCart.count + count,
        },
      });
    } else {
      this.productsInCart$.next({
        ...this.productsInCart$.getValue(),
        [product.id]: { product, count, params },
      });
    }

    this.storageService.set('cart-v2', this.productsInCart$.getValue());
  }

  removeProduct(id: string): void {
    const cart = this.productsInCart$.getValue();
    delete cart[id];
    this.productsInCart$.next(cart);

    this.storageService.set('cart-v2', this.productsInCart$.getValue());
  }

  changeCount(id: string, count: number) {
    const productInCart: CartItem = this.productsInCart$.getValue()[id];

    if (productInCart && count === 0) {
      return this.removeProduct(id);
    }

    if (productInCart) {
      productInCart.count = count;
      this.productsInCart$.next({
        ...this.productsInCart$.getValue(),
        [id]: productInCart,
      });

      this.storageService.set('cart-v2', this.productsInCart$.getValue());
    } else {
      throw new Error('Product is not in the cart');
    }
  }
}
