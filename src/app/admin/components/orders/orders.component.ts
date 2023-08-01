import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Order, OrderAPI } from '../../types/admin.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  orders$: Observable<Order[]>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'phone', 'created'];

  limit = 10;
  pageIndex = 0;
  currentPage = 1;
  sortAPI = 'name';
  filter: '';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private adminService: AdminService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  setAllOrders(limit: number, page: number, sort: string, filter?: string) {
    this.orders$ = this.adminService
      .getAllOrders(limit, page, sort, filter)
      .pipe(
        map((res: OrderAPI[]) => {
          return res.map((order: OrderAPI) => {
            return {
              id: order.id,
              name: order.name,
              phone: order.phone,
              created: order.createdAt,
              products: order.products,
            };
          });
        })
      );
  }

  setData() {
    this.setAllOrders(this.limit, this.currentPage, this.sortAPI, this.filter);
    this.orders$.subscribe((value) => {
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
