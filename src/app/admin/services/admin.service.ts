import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../modules/login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;

  constructor( private http: HttpClient) {
  }

  getAllUsers(
    limit: number = 10,
    page: number = 1,
    sort: string = 'createdAt',
    filter: string = 'username'
  ) {
    return this.http.get(`${this.baseUrl}/users`, {
      params: {
        limit,
        page,
        sort,
        filter,
      },
    });
  }

  getAllOrders() {

  }
}
