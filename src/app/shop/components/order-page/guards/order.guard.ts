import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CartService } from '@sharedModule/services/cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartService.hasProductsInCart() || this.router.navigate(['']);
  }
}
