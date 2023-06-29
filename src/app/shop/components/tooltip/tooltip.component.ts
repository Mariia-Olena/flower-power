import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { CartService } from '@sharedModule/services/cart.service';

import { CartProduct } from '@sharedModule/types/product-plant.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, AfterContentChecked {
  cart: CartProduct[] = [];
  sum: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.showAllProducts();
  }

  ngAfterContentChecked() {
    this.cart = this.cartService.showAllProducts();
    this.sum = this.cartService.getSum();
  }
}
