import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '@sharedModule/services/cart.service';

import { CartProduct } from '@sharedModule/types/product-plant.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, DoCheck {
  cart: CartProduct[] = [];
  sum: number = 0;

  constructor(private cartService: CartService) {}

  changeCount(id: string, count: number): void {
    this.cartService.changeCount(id, count)
  }

  ngOnInit(): void {
    this.cart = this.cartService.showAllProducts();
  }

  ngDoCheck(): void {
    this.cart = this.cartService.showAllProducts();
    this.sum = this.cartService.getSum();
  }
}
