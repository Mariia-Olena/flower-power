import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '@sharedModule/services/cart.service';

import { Cart, CartItem } from '@sharedModule/types/cart-item.interface';
import { Plant } from '@shop/product-home/components/product/types/plant.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  // dataSource: CartItem[] = [];
  cart: Plant[]

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  constructor(private cartService: CartService) {}

  // getTotalPrice(): number {
  //   return this.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  // }

  // removeProduct(id: string): void {
  //   this.cart.items = this.cart.items.filter((item) => item.id !== id);
  // }



  ngOnInit(): void {
    this.cart = this.cartService.showAllProducts()
  }
}
