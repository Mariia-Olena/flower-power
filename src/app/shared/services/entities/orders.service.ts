import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '@sharedModule/services/cart-v2.service';
import { HttpClient } from '@angular/common/http';
import { APIorder } from '@services/entities/types/order.interface';
import { Order, OrderProducts } from '@shop/order-page/types/order.interface';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { StorageService } from '../storage.service';
import { BasedCrudHttpService } from './based-crud-http.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BasedCrudHttpService<APIorder, Order> {
  private baseUrl = environment.baseUrl;
  private _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();
  private currentOrder = new BehaviorSubject<APIorder>(
    this.storage.get('order')
  );
  showModal = new BehaviorSubject<boolean>(false);

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

  getAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): Observable<APIorder[]> {
    return this.http.get<APIorder[]>(`${this.baseUrl}/orders`, {
      observe: 'response',
      params: {
        ...(limit ? { limit: limit } : {}),
        page,
        sort,
        ...(filter ? { filter: filter } : {}),
      },
    })
    .pipe(
      map(({ headers, body }) => {
        this._itemsCount$.next(+(headers.get('items-count') || 1));

        return body || [];
      })
    );
  }

  create(order: Order): Observable<APIorder> {
    return this.http
      .post(`${this.baseUrl}/orders`, JSON.stringify(order), {
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

  update(body: APIorder): void {}
  remove(id: string): void {}
}
