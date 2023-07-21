import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@sharedModule/services/storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface LogInCredentials {
  username: string;
  password: string;
}

interface LogInResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  accessToken$ = new BehaviorSubject<string>(this.storageService.get('access_token'));

  constructor(private storageService: StorageService, private http: HttpClient) {}

  logIn(credentials: LogInCredentials) {
    return this.http
      .post(`${this.baseUrl}/auth/login`, credentials)
      .pipe(tap((response: LogInResponse) => {
        this.accessToken$.next(response.access_token);
        this.storageService.set('access_token', response.access_token);
      } ));
  }
}
