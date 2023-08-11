import { Component } from '@angular/core';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import {
  APIproduct,
  ProductAdmin,
} from '@sharedModule/services/entities/types/product.interface';
import { ToolbarService } from '@admin/services/toolbar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BasedCrudComponent<APIproduct,ProductAdmin> {
  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'price', 'created', 'edit'];
  params = {
    limit: 5,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: 'aloe',
    length: 1,
  };

  constructor(private productsService: ProductsService, private toolBarService: ToolbarService) {
    super(productsService, toolBarService);
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

  getToolbarValue(searchValue: string): string {
    return `name;${searchValue}`
  }
}
