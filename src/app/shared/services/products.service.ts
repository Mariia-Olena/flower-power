import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

import { APIproduct } from '../types/product-plant.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://hys-fe-course-api-mariia-olena.vercel.app';
  id = '24faed67-733c-4e89-a43c-ae3fe4086122';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<APIproduct>(`${this.baseUrl}/products/${this.id}`, {});
  }

  getAllProducts() {
    return this.http.get<APIproduct[]>(`${this.baseUrl}/products`, {});
  }
}
