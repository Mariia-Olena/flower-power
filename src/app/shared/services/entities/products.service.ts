import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  APIproduct,
  Product,
  ProductAdmin,
} from '@sharedModule/services/entities/types/product.interface';
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/services/entities/based-crud-http-service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BasedCrudHttpService<
  APIproduct,
  ProductAdmin
> {
  constructor(private http: HttpClient) {
    super();
  }

  getOne(id: string): Observable<APIproduct> {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${id}`, {});
  }

  getAll(params: ParamsHttp): Observable<APIproduct[]> {
    return this.http
      .get<APIproduct[]>(`${this.baseUrl}/products`, {
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

  create(body: Product): Observable<APIproduct> {
    return this.http.post<APIproduct>(
      `${this.baseUrl}/products`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  update(body: Product, id: string): Observable<APIproduct> {
    return this.http.put<APIproduct>(
      `${this.baseUrl}/products/${id}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  remove(id: string): void {
    this.http.delete<APIproduct>(`${this.baseUrl}/products/${id}`, {}).subscribe();
  }
}
