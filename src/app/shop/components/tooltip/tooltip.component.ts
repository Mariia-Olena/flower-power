import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService, CartItem } from '@sharedModule/services/cart.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {}

  changeCount(id: string, count: number): void {
    this.cartService.changeCount(id, count);
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.setCart();
    this.total$ = this.cartService.total$;
  }
}
