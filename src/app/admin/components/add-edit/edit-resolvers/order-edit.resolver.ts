import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from '@sharedModule/services/entities/orders.service';
import { APIorder } from '@sharedModule/services/entities/types/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderEditResolver implements Resolve<APIorder> {
  constructor(private router: Router, private ordersService: OrdersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<APIorder> {
    return this.ordersService.getOne(route.params?.['id'])
  }
}
