import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasedCrudHttpService } from './based-crud-http.service';
import { APIuser, UserAdmin } from './types/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends BasedCrudHttpService<APIuser, UserAdmin> {
  private baseUrl = environment.baseUrl;
  private _itemsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  itemsCount$: Observable<number> = this._itemsCount$.asObservable();

  constructor(private http: HttpClient) {
    super()
  }

  getOne(id: string): Observable<APIuser> {
    return this.http.get<APIuser>(`${this.baseUrl}/users/${id}`, {});
  }

  getAll(
    limit: number,
    page: number,
    sort: string,
    filter: string
  ): Observable<APIuser[]> {
    return this.http
      .get<APIuser[]>(`${this.baseUrl}/users`, {
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

  create(body: APIuser) {};
  update(body: APIuser) {};
  remove(id: string) {};
}