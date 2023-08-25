import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BasedCrudHttpService } from '@sharedModule/services/entities/based-crud-http-service';
import { APIproduct } from '@sharedModule/services/entities/types/product.interface';
import { ProductsService } from '@sharedModule/services/entities/products.service';

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<APIproduct> {
  constructor(private router: Router, private productsService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIproduct> {
    return this.productsService.getOne(route.params?.['id'])
  }
}
