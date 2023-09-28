import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { APIproduct, ProductAdmin } from '@sharedModule/services/entities/types/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductFilter {
  priceMore(
    items: Observable<ProductAdmin[]>,
    filterValue: string
  ): Observable<ProductAdmin[]> {
    return items.pipe(
      tap((items: ProductAdmin[]) => {
        return items.filter((item: ProductAdmin) => item.price >= +filterValue);
      })
    );
  }

  priceLess(
    items: Observable<ProductAdmin[]>,
    filterValue: string
  ): Observable<ProductAdmin[]> {
    return items.pipe(
      tap((items: ProductAdmin[]) => {
        return items.filter((item: ProductAdmin) => item.price <= +filterValue);
      })
    );
  }
}
