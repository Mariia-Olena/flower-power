import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CartV2Service,
  CartItem,
} from '@sharedModule/services/cart-v2.service';
import { OrderService } from '@sharedModule/services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, OnDestroy {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private cartV2Service: CartV2Service,
    public orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartV2Service.setCart();
    this.total$ = this.cartV2Service.total$;
  }

  ngOnDestroy(): void {
    this.orderService.showModal.next(false);
  }
}
