import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import {
  APIorder,
  Order,
} from '@sharedModule/services/entities/types/order.interface';
import { EditResolver } from '@admin/components/add-edit/edit.resolver';

@Injectable({
  providedIn: 'root',
})
export class OrderEditResolver
  extends EditResolver<APIorder, Order>
  implements Resolve<APIorder>
{
  constructor(private ordersService: OrdersService) {
    super(ordersService);
  }
}
