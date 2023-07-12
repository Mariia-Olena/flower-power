import { Component, Input } from '@angular/core';
import { CartItem } from '@sharedModule/services/cart-v2.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() cart: CartItem[];
  @Input() total: number;
}
