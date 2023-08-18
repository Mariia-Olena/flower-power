import { Component } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import {
  OrderAdmin,
  APIorder,
} from '@sharedModule/services/entities/types/order.interface';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BasedCrudComponent<APIorder, OrderAdmin> {
  options = [
    'name',
    'price',
    'description',
    'author',
    'createdAt',
    'updatedAt',
  ];
  displayedColumns: string[] = [
    'id',
    'name',
    'phone',
    'created',
    'updated',
    'edit',
  ];
  params = {
    limit: 10,
    pageIndex: 0,
    page: 1,
    sort: 'name',
    filter: [],
    length: 1,
  };

  constructor(private ordersService: OrdersService, private router: Router) {
    super(ordersService, router);
  }

  mapEntityData(res: APIorder[]): OrderAdmin[] {
    return res.map((order: APIorder) => {
      return {
        id: order.id,
        name: order.name,
        phone: order.phone,
        created: order.createdAt,
        updated: order.updatedAt,
        products: order.products,
      };
    });
  }

  getToolbarValue(searchValue: string): string[][] {
    return [['name', searchValue], ['phone', searchValue]];
  }
}
