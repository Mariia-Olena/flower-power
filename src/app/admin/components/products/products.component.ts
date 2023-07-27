import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { APIproduct } from '@sharedModule/types/product-plant.interface';
import { Observable, map } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

interface Product {
  id: string;
  name: string;
  price: number;
  created: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  products$: Observable<Product[]>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'created'];

  limit = 10;
  pageIndex = 0;
  currentPage = 1;
  sortAPI = 'name';
  filter: '';
  length = 1;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  setAllProducts(limit: number, page: number, sort: string, filter?: string) {
    this.products$ = this.productsService
      .getAllProducts(limit, page, sort, filter)
      .pipe(
        map((res: APIproduct[]) => {
          return res.map((product: APIproduct) => {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              created: product.createdAt,
            };
          });
        })
      );
  }

  setData() {
    this.setAllProducts(
      this.limit,
      this.currentPage,
      this.sortAPI,
      this.filter
    );
    this.productsService.allProductsCount.subscribe((value) => {
      this.length = value;
    });
    this.products$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.currentPage = pageEvent.pageIndex + 1;

    this.setData();
  }

  ngOnInit(): void {
    this.setData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
