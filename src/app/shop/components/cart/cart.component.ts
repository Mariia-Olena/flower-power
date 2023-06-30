import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '@sharedModule/services/cart.service';
import { CartV2Service } from '@sharedModule/services/cart-v2.service';

import { CartProduct } from '@sharedModule/types/product-plant.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, DoCheck {
  cart: CartProduct[] = [];

  constructor(
    private cartService: CartService,
    public cartV2Service: CartV2Service
  ) {}

  trackByIndex(index: number, item: CartProduct) {
    return index;
  }

  setCart() {
    this.cart = this.cartService.showAllProducts();
  }

  removeProduct(id: string) {
    this.cartService.removeProduct(id);
    this.setCart();
    this.getSum();
  }

  changeCount(id: string, count: number): void {
    this.cartService.changeCount(id, count)
    this.setCart();
  }

  getSum() {
    return this.cartService.getSum();
  }

  ngOnInit(): void {
    this.setCart();
    this.getSum();
  }

  ngDoCheck(): void {
    this.setCart();
  }
}
