import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  remove(key: string): void {
    sessionStorage.removeItem(key)
  }

  setToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
