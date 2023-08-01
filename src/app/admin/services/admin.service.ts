import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Toolbar {
  searchValue: string;
  searchName: string;
  filterValue: string;
  filterName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  toolbar$ = new BehaviorSubject<Toolbar>(null);

  constructor(private http: HttpClient) {}

  getAllUsers(limit: number, page: number, sort: string, filter: string) {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        limit,
        page,
        sort,
        ...(filter ? { filter: filter } : {}),
      },
    });
  }

  getAllOrders(limit: number, page: number, sort: string, filter: string) {
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
