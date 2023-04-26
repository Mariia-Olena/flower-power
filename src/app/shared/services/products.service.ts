import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIproduct } from '../types/product-plant.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<APIproduct> {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${id}`, {});
  }

  getAllProducts(limit: number, page: number, sort: string = ''): Observable<APIproduct[]> {
    return this.http.get<APIproduct[]>(`${this.baseUrl}/products`, {
      params: {
        limit: limit,
        page: page,
        sort: sort
      },
    });
  }
}
