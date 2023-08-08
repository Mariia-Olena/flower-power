import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { APIproduct, ProductAdmin } from './types/product.interface';
import { environment } from 'src/environments/environment';
import { BasedCrudHttpService } from './based-crud-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BasedCrudHttpService<APIproduct, ProductAdmin> {
  private baseUrl = environment.baseUrl;
  private _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();

  constructor(private http: HttpClient) {
    super()
  }

  getOne(id: string): Observable<APIproduct> {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${id}`, {});
  }

  getAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): Observable<APIproduct[]> {
    return this.http
      .get<APIproduct[]>(`${this.baseUrl}/products`, {
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

  create(body: APIproduct) {};
  update(body: APIproduct) {};
  remove(id: string) {};
}
