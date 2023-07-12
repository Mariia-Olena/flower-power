import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { APIorder, Order } from '@sharedModule/types/order.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.baseUrl;
  private order: Order;

  constructor(private http: HttpClient) {}

  createOrder(orderForm: FormGroup): void {
    const {
      phone,
      firstName,
      secondName,
      country,
      region,
      city,
      address,
    } = orderForm.value

    this.order = {
      name: firstName + secondName,
      phone: phone,
      message: `${country}, ${region}, ${city}, ${address}`,
      products: [
        
      ]
    };
    
  }

  postOrder(order: Order) {
    return this.http.post<Order>(`${this.baseUrl}/orders`, { order });
  }
}
