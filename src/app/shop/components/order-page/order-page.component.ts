import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartV2Service,
  CartItem,
} from '@sharedModule/services/cart-v2.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private cartV2Service: CartV2Service
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartV2Service.setCart();
    this.total$ = this.cartV2Service.total$;
  }
}
