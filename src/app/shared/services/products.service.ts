import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { APIproduct } from '../types/product-plant.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://hys-fe-course-api-mariia-olena.vercel.app';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http
      .get<APIproduct>(
        `${this.baseUrl}/products/d8c189cb-4d2a-42e9-a92b-7aab64a62cf5`,
        {}
      )
      .pipe(map((value) => value));
  }
}
