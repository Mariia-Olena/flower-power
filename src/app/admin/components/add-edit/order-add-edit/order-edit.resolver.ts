import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { APIorder, Order } from '@sharedModule/services/entities/types/order.interface';
import { EditResolver } from '../edit.resolver';

@Injectable({
  providedIn: 'root',
})
export class OrderEditResolver extends EditResolver<APIorder, Order> implements Resolve<APIorder> {
  url = 'orders';

  constructor(private ordersService: OrdersService, private router: Router) {
    super(ordersService, router);
  }
}
