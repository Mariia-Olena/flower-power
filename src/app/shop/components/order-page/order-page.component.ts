import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '@sharedModule/services/cart.service';
import { OrdersService } from '@sharedModule/services/entities/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit, OnDestroy {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private cartService: CartService,
    public ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.setCart();
    this.total$ = this.cartService.total$;
  }

  ngOnDestroy(): void {
    this.ordersService.showModal.next(false);
  }
}
