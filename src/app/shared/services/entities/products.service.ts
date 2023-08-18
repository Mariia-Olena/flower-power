import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  APIproduct,
  ProductAdmin,
} from '@sharedModule/services/entities/types/product.interface';
import { environment } from 'src/environments/environment';
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/types/based-crud-http-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService
  implements BasedCrudHttpService<APIproduct, ProductAdmin>
{
  private baseUrl = environment.baseUrl;
  private _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();

  constructor(private http: HttpClient) {}

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

  create(body: APIproduct) {}
  update(body: APIproduct) {}
  remove(id: string) {}
}
