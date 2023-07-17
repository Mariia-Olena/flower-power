import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OrderService } from '@sharedModule/services/order.service';
import { Observable } from 'rxjs';
import { APIorder } from '@sharedModule/types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationGuard implements CanActivate {
  constructor(private orderService: OrderService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log();
      
    return !!this.orderService.getCurrentOrder() || this.router.createUrlTree(['']);
  }
}
