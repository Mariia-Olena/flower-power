import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartV2Service,
  CartItem,
} from '@sharedModule/services/cart-v2.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private cartV2Service: CartV2Service
  ) {}

  changeCount(id: string, count: number): void {
    this.cartV2Service.changeCount(id, count);
  }

  ngOnInit(): void {
    this.cart$ = this.cartV2Service.setCart();
    this.total$ = this.cartV2Service.total$;
  }
}
