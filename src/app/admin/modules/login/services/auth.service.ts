import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '@sharedModule/services/storage.service';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogInCredentials, LogInResponse } from '../types/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  private accessToken$ = new BehaviorSubject<string>(
    this.storageService.get('access_token')
  );

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  getAccessTokenValue(): string | null {
    return this.accessToken$.getValue();
  }

  isAccessToken(): boolean {
    return !!this.accessToken$.getValue();
  }

  logIn(credentials: LogInCredentials) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response: LogInResponse) => {
        this.accessToken$.next(response.access_token);
        this.storageService.set('access_token', response.access_token);
      })
    );
  }
}
