import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@sharedModule/services/entities/products.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BasedCrudComponent } from '@sharedModule/services/entities/based-crud.component';
import { APIproduct, ProductAdmin } from '@sharedModule/services/entities/types/product.interface';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent
  extends BasedCrudComponent<APIproduct, ProductAdmin>
  implements OnInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  items$: Observable<ProductAdmin[]> = new Observable<ProductAdmin[]>(null);
  toolbar$ = new BehaviorSubject<Toolbar>(null);

  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'price', 'created', 'edit'];
  dataSource: MatTableDataSource<any>;
  params = {
    limit: 5,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: 'aloe',
    length: 1,
  };

  constructor(private productsService: ProductsService) {
    super(productsService);
    this.dataSource = new MatTableDataSource<any>();
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

  ngOnInit(): void {
    this.setData(
      this.params.limit,
      this.params.currentPage,
      this.params.sort,
      this.params.filter
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
