import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(
    limit: number ,
    page: number,
    sort: string ,
    filter: string 
  ) {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        limit,
        page,
        sort,
        ...(filter ? {filter: filter} : {}),
      },
    });
  }

  getAllOrders(
    limit: number ,
    page: number,
    sort: string ,
    filter: string
  ) {
    return this.http.get(`${this.baseUrl}/orders`, {
      params: {
        limit,
        page,
        sort,
        filter,
      },
    });
  }
}
