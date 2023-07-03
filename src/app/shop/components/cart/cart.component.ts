import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartV2Service,
  CartItem,
} from '@sharedModule/services/cart-v2.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private cartV2Service: CartV2Service
  ) {}

  removeProduct(id: string) {
    this.cartV2Service.removeProduct(id);
  }

  changeCount(id: string, count: number): void {
    this.cartV2Service.changeCount(id, count);
  }

  ngOnInit(): void {
    this.cart$ = this.cartV2Service.setCart();
    this.total$ = this.cartV2Service.total$;
  }
}
