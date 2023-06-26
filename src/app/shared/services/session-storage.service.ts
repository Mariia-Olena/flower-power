import { Injectable } from '@angular/core';
import { Product, CartProduct } from '@sharedModule/types/product-plant.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  set(key: string, data: Product): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): CartProduct {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  }

  getAll(): { [id: string]: CartProduct } {
    const storage = {};
    Object.keys(sessionStorage).map((key) => {
      storage[key] = this.get(key);
    });
    
    return storage
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
