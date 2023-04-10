import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Cart, CartItem } from '@sharedModule/types/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  dataSource: CartItem[] = [];

  counterForm: FormGroup = new FormGroup({
    quantity: new FormControl(0),
  });

  cart: Cart = {
    items: [
      {
        name: 'Peace Lily Plant',
        size: '30-40cm',
        img: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
        price: 23.99,
        quantity: 2,
        id: '1',
      },
      {
        name: 'Peace Lily Plant',
        size: '30-40cm',
        img: 'https://images.unsplash.com/photo-1617693322135-13831d116f79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
        price: 23.99,
        quantity: 1,
        id: '2',
      },
      {
        name: 'Peace Lily Plant',
        size: '30-40cm',
        img: 'https://images.unsplash.com/photo-1616500443036-788d60118813?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
        price: 23.99,
        quantity: 1,
        id: '3',
      },
    ],
  };

  getTotalPrice(): number {
    return this.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeProduct(id: string): void {
    this.cart.items = this.cart.items.filter((item) => item.id !== id);
  }

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
}
