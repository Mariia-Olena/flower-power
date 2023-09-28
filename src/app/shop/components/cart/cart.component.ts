import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '@sharedModule/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {}

  removeProduct(id: string) {
    this.cartService.removeProduct(id);
  }

  changeCount(id: string, count: number): void {
    this.cartService.changeCount(id, count);
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.setCart();
    this.total$ = this.cartService.total$;
  }
}
