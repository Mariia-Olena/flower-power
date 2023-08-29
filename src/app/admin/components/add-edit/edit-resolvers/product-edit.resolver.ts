import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductEditResolver implements Resolve<APIproduct> {
  constructor(private router: Router, private productsService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIproduct> {
    return this.productsService.getOne(route.params?.['id'])
  }
}
