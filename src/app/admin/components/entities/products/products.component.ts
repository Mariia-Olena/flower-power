import { Component } from '@angular/core';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import {
  APIproduct,
  ProductAdmin,
} from '@sharedModule/services/entities/types/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BasedCrudComponent<
  APIproduct,
  ProductAdmin
> {
  options = ['Price more than', 'Price less than', 'Newer than', 'Older than'];
  displayedColumns: string[] = ['id', 'name', 'price', 'created', 'edit'];
  params = {
    limit: 5,
    pageIndex: 0,
    page: 1,
    sort: 'name',
    filter: [],
    length: 1,
  };

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    super(productsService, router);
  }

  mapEntityData(res: APIproduct[]): ProductAdmin[] {
    return res.map((product: APIproduct) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        created: product.createdAt,
      };
    });
  }

  getToolbarValue(searchValue: string): string[][] {
    return [['name', searchValue], ['description', searchValue]];
  }
}
