import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '@sharedModule/services/cart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
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
} from '@sharedModule/types/based-crud-http-service.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements BasedCrudHttpService<APIorder, Order> {
  private baseUrl = environment.baseUrl;
  private _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();
  private currentOrder = new BehaviorSubject<APIorder>(
    this.storage.get('order')
  );
  showModal = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storage: StorageService) {}

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

  setParams(params: ParamsHttp): HttpParams {
    let httpParams = new HttpParams()
      .append('limit', params.limit.toString())
      .append('page', params.page.toString())
      .append('sort', params.sort);

    if (params.filter.length > 0) {
      params.filter.forEach((item) => {
        httpParams = httpParams.append('filter', `${item[0]};${item[1]}`);
      });
    }

    return httpParams;
  }

  update(body: APIorder): void {}
  remove(id: string): void {}
}
