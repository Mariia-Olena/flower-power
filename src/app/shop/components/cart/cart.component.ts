import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '@sharedModule/services/cart.service';

import { CartProduct } from '@sharedModule/types/product-plant.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartProduct[];
  sum: number = this.cartService.getSum();

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  constructor(private cartService: CartService) {}

  trackByIndex(index: number, item: CartProduct) {
    return index;
  }

  removeProduct(id: string) {
    this.cartService.removeProduct(id);
  }

  ngOnInit(): void {
    this.cart = this.cartService.showAllProducts();
  }

  updateTotal() {
    this.sum = this.cartService.getSum();
  }
}
