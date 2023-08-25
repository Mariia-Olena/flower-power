import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  BasedCrudHttpService,
  ParamsHttp,
} from '@sharedModule/services/entities/based-crud-http-service';
import {
  APIuser,
  User,
  UserAdmin,
} from '@sharedModule/services/entities/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BasedCrudHttpService<APIuser, UserAdmin> {
  constructor(private http: HttpClient) {
    super();
  }

  getOne(id: string): Observable<APIuser> {
    return this.http.get<APIuser>(`${this.baseUrl}/users/${id}`, {});
  }

  getAll(params: ParamsHttp): Observable<APIuser[]> {
    return this.http
      .get<APIuser[]>(`${this.baseUrl}/users`, {
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

  create(body: User): Observable<APIuser> {
    return this.http.post<APIuser>(
      `${this.baseUrl}/users`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  update(body: User, id: string): Observable<APIuser> {
    return this.http.put<APIuser>(
      `${this.baseUrl}/users/${id}`,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  remove(id: string): void {
    this.http.delete<APIuser>(`${this.baseUrl}/users/${id}`, {}).subscribe();
  }
}
