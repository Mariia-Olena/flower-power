import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, pipe, tap } from 'rxjs';

import { APIproduct } from '../types/product-plant.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;
  private _allProductsCount: BehaviorSubject<number> = new BehaviorSubject(0);
  allProductsCount: Observable<number> = this._allProductsCount.asObservable();

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<APIproduct> {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${id}`, {});
  }

  getAllProducts(
    limit: number,
    page: number,
    sort: string
  ): Observable<APIproduct[]> {
    return this.http
      .get<APIproduct[]>(`${this.baseUrl}/products`, {
        observe: 'response',
        params: {
          ...(limit && { limit }),
          // ...(limit ? {limit: limit} : {}),
          page,
          sort,
        },
      })
      .pipe(
        map(({ headers, body }) => {
          this._allProductsCount.next(+(headers.get('All-Products') || 1));
          return body || [];
        })
      );
  }
}
