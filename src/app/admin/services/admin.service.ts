import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = environment.baseUrl;

  accessToken$: BehaviorSubject<string>;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.accessToken$ = this.authService.accessToken$;
  }

  getAllUsers(
    limit: number = 10,
    page: number = 1,
    sort: string = 'createdAt',
    filter: string = 'username'
  ) {
    return this.http.get(`${this.baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${this.accessToken$.getValue()}`,
      },
      params: {
        limit,
        page,
        sort,
        filter,
      },
    });
  }
}
