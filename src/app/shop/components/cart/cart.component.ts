import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '@sharedModule/services/cart.service';

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
