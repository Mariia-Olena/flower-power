import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@sharedModule/services/products.service';
import { APIproduct } from '@sharedModule/types/product-plant.interface';
import { Observable, map } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
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

  products$: Observable<Product[]>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'created'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private productsService: ProductsService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  getAllProducts() {
    this.products$ = this.productsService.getAllProducts(10, 1, 'name').pipe(
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
    )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.products$.subscribe((value) => {
      this.dataSource.data = value;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
