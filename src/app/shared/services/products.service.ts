import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, shareReplay} from 'rxjs';

import { APIproduct } from '../types/product-plant.interface';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<APIproduct> {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${id}`, {});
  }

  getAllProducts(): Observable<APIproduct[]> {
    return this.http.get<APIproduct[]>(`${this.baseUrl}/products`, {});
  }
}
