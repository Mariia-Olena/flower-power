import { Injectable } from '@angular/core';
import { CartItem } from '@sharedModule/services/cart.service';
import { HttpClient } from '@angular/common/http';
import {
  APIorder,
  Order,
  OrderProducts,
} from '@sharedModule/services/entities/types/order.interface';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { StorageService } from '../storage.service';
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/services/entities/based-crud-http-service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BasedCrudHttpService<APIorder, Order> {
  private currentOrder = new BehaviorSubject<APIorder>(
    this.storage.get('order')
  );
  
  constructor(private http: HttpClient, private storage: StorageService) {
    super();
  }

  setUpOrder(orderForm: FormGroup, orderProducts: CartItem[]): Order {
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
      name: firstName + ' ' + secondName,
      phone: phone,
      message: `${country}, ${region}, ${city}, ${address}`,
      products: products,
    };
  }

  getCurrentOrder() {
    return this.currentOrder.getValue();
  }

  resetCurrentOrder() {
    this.currentOrder.next(null);
  }

  getOne(id: string): Observable<APIorder> {
    return this.http.get<APIorder>(`${this.baseUrl}/orders/${id}`, {});
  }

  getAll(params: ParamsHttp): Observable<APIorder[]> {
    return this.http
      .get<APIorder[]>(`${this.baseUrl}/orders`, {
        observe: 'response',
        params: this.setParams(params),
      })
      .pipe(
        map(({ headers, body }) => {
          this._itemsCount$.next(+(headers.get('items-count') || 1));

          return body || [];
        })
      );
  }

  create(body: Order): Observable<APIorder> {
    return this.http
      .post(`${this.baseUrl}/orders`, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response: APIorder) => {
          this.currentOrder.next(response);
          this.storage.set('order', response);
        })
      );
  }

  update(body: Order, id: string): Observable<APIorder> {
    return this.http.put<APIorder>(
      `${this.baseUrl}/orders/${id}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  remove(id: string): Observable<APIorder> {
    return this.http.delete<APIorder>(`${this.baseUrl}/orders/${id}`, {});
  }
}
