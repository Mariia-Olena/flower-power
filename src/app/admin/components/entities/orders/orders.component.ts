import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { OrderAdmin, APIorder } from '@services/entities/types/order.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BasedCrudComponent } from '@sharedModule/services/entities/based-crud.component';
import { Toolbar } from '@admin/components/toolbar/types/toolbar.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent
  extends BasedCrudComponent<APIorder, OrderAdmin>
  implements OnInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  items$: Observable<OrderAdmin[]> = new Observable<OrderAdmin[]>(null);
  toolbar$ = new BehaviorSubject<Toolbar>(null);

  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = ['id', 'name', 'phone', 'created'];
  dataSource: MatTableDataSource<any>;
  params = {
    limit: 10,
    pageIndex: 0,
    currentPage: 1,
    sort: 'name',
    filter: '',
    length: 1,
  };

  constructor(private ordersService: OrdersService) {
    super(ordersService);
    this.dataSource = new MatTableDataSource<any>();
  }

  mapEntityData(res: APIorder[]): OrderAdmin[] {
    return res.map((order: APIorder) => {
      return {
        id: order.id,
        name: order.name,
        phone: order.phone,
        created: order.createdAt,
        products: order.products,
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
