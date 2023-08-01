import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { APIproduct } from '@sharedModule/types/product-plant.interface';
import { Observable, map } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../types/admin.interface';

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
  displayedColumns: string[] = ['id', 'name', 'price', 'created', 'edit'];

  limit = 15;
  pageIndex = 0;
  currentPage = 1;
  sortAPI = 'name';
  filter: '';
  length = 1;

  options = ['name', 'price', 'description', 'author', 'createdAt', 'updatedAt']

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  setAllProducts(limit: number, page: number, sort: string, filter: string) {
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

  setData(limit: number, page: number, sort: string, filter: string) {
    this.setAllProducts(limit, page, sort, filter);
    this.productsService.allProductsCount.subscribe((value) => {
      this.length = value;
    });
    this.products$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  onSubmit(event: Event) {
    const { searchValue, searchName, filterValue, filterName } = this.adminService.toolbar$.getValue();
    this.setData(this.limit, this.currentPage, this.sortAPI, `${searchName};${searchValue}` );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction === 'desc') {
      this.sortAPI = `+${sortState.active}` ;
      this.setData(this.limit, this.currentPage, this.sortAPI, this.filter);
      return
    }

    if (sortState.direction === 'asc') {
      this.sortAPI = `-${sortState.active}` ;
      this.setData(this.limit, this.currentPage, this.sortAPI, this.filter);
      return
    } 
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.currentPage = pageEvent.pageIndex + 1;

    this.setData(this.limit, this.currentPage, this.sortAPI, this.filter);
  }

  ngOnInit(): void {
    this.setData(this.limit, this.currentPage, this.sortAPI, this.filter);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
