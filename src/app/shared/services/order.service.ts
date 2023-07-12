import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '@sharedModule/services/cart-v2.service';

import { HttpClient } from '@angular/common/http';
import {
  APIorder,
  Order,
  OrderProducts,
} from '@sharedModule/types/order.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.baseUrl;
  private order: Order;

  constructor(private http: HttpClient) {}

  createOrder(orderForm: FormGroup, orderProducts: CartItem[]): void {
    const { phone, firstName, secondName, country, region, city, address } =
      orderForm.value;

    const products: OrderProducts[] = orderProducts.reduce((acc, item) => {
      return (acc = [
        ...acc,
        {
          quantity: item.count,
          name: item.product.name,
          id: item.product.id,
        },
      ]);
    }, []);

    this.order = {
      name: firstName + secondName,
      phone: phone,
      message: `${country}, ${region}, ${city}, ${address}`,
      products: products,
    };

    this.postOrder(this.order)
  }

  postOrder(order: Order) {
    console.log(JSON.stringify(order));
    
    this.http.post(`${this.baseUrl}/orders`, JSON.stringify(order)).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
