import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '@sharedModule/services/cart-v2.service';
import { HttpErrorResponse } from '@angular/common/http';
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
  response: EventEmitter<APIorder> = new EventEmitter<APIorder>();
  error: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

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

    const order: Order = {
      name: firstName + secondName,
      phone: phone,
      message: `${country}, ${region}, ${city}, ${address}`,
      products: products,
    };

    this.postOrder(order);
  }

  postOrder(order: Order) {
    return this.http
      .post(`${this.baseUrl}/orders`, JSON.stringify(order), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (response: APIorder) => {
          this.response.emit(response) 
        },
        error => {
          this.error.emit(error);
        }
      );
  }
}
