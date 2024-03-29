import { Component } from '@angular/core';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import {
  APIorder,
  Order,
  OrderAdmin
} from '@sharedModule/services/entities/types/order.interface';
import { BasedCrudComponent } from '@admin/components/entities/based-crud.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionConfig } from '@admin/components/table/table.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BasedCrudComponent<APIorder, Order, OrderAdmin> {
  options = {
    search: ['name', 'phone'],
    filter: [
      'name',
      'price',
      'description',
      'author',
      'createdAt',
      'updatedAt',
    ],
  };
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
  override actionConfig: ActionConfig[] = [
    ...this.actionConfig,
    {
    name: 'confirm',
    onClick: (id: string) => console.log(id),
    icon: 'check_circle_outline',
    color: 'primary',
    disabled: () => false
  }]

  constructor(public ordersService: OrdersService, private router: Router, private route: ActivatedRoute) {
    super(ordersService, router, route);
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

  
}
