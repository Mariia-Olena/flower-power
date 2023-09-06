import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { APIproduct, Product } from '@sharedModule/services/entities/types/product.interface';
import { EditResolver } from '../edit.resolver';

@Injectable({
  providedIn: 'root',
})
export class ProductEditResolver extends EditResolver<APIproduct, Product> implements Resolve<APIproduct> {
  url = 'products';

  constructor(private productsService: ProductsService, private router: Router) {
    super(productsService, router);
  }
}