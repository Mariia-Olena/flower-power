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
import { BehaviorSubject, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.baseUrl;
  private currentOrder = new BehaviorSubject<APIorder>(this.storage.get('order'));
  showModal = false;
  
  constructor(private http: HttpClient, private storage: StorageService) {}

  createOrder(orderForm: FormGroup, orderProducts: CartItem[]): Order {
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

    return {
      name: firstName + secondName,
      phone: phone,
      message: `${country}, ${region}, ${city}, ${address}`,
      products: products,
    };
  }

  postOrder(order: Order) {
    return this.http
      .post(`${this.baseUrl}/orders`, JSON.stringify(order), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response: APIorder) => {
          this.currentOrder.next(response);
          this.storage.set('order', response)
        })
      );
  }

  getCurrentOrder() {
    return this.currentOrder.getValue()
  }

  resetCurrentOrder() {
    this.currentOrder.next(null)
  }
}
